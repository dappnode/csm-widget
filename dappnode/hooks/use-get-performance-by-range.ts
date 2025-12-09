import { useEffect, useState } from 'react';
import { useGetOperatorPerformance } from './use-get-operator-performance';
import { Range, ValidatorStats } from '../performance/types';
import { useDappStatus, useNodeOperatorId } from 'modules/web3';

export const useGetPerformanceByRange = (range: Range) => {
  const { operatorData: operatorDataRaw, isLoading } =
    useGetOperatorPerformance();
  const [operatorDataByRange, setOperatorDataByRange] = useState<
    Record<string, any>
  >({});
  const [validatorsStats, setValidatorsStats] = useState<ValidatorStats[]>([]);
  const [threshold, setThreshold] = useState<number>(0);
  const [thresholdsByEpoch, setThresholdsByEpoch] = useState<any[]>([]);

  const { chainId } = useDappStatus();
  const nodeOperatorId = useNodeOperatorId();
  const parsedNOId = Number(nodeOperatorId);

  const epochRanges: Record<Range, number> = {
    week: 1575, // 7 days * 225 epochs / day
    month: 7650, // 30 days * 225 epochs / day
    year: 82125, // 365 days * 225 epochs / day
    ever: Infinity,
  };

  const epochsInRange = epochRanges[range];

  useEffect(() => {
    if (!operatorDataRaw) return;

    // Map operator data to a more usable format
    const operatorData = Object.fromEntries(
      Object.entries(operatorDataRaw).map(([, entry]) => {
        const typedEntry = entry as any; // Replace 'any' with the actual type if available
        const frame = typedEntry.frame;
        const operators = typedEntry.operators;
        const operatorIds = Object.keys(operators);
        // Assuming we're interested in the first operator (you can adjust as needed)
        const operatorId = operatorIds[0];
        const operatorInfo = operators[operatorId];
        const validators = operatorInfo.validators;

        // Calculate threshold as average performance threshold across validators
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const validatorEntries = Object.values(validators) as any[];
        const threshold =
          validatorEntries.reduce((sum, val) => sum + val.threshold, 0) /
          validatorEntries.length;

        return [
          `${frame[0]}-${frame[1]}`,
          {
            operators: {
              [operatorId]: {
                distributed_rewards: operatorInfo.distributed_rewards,
                validators,
                threshold,
              },
            },
          },
        ];
      }),
    );

    const sortedKeys = Object.keys(operatorData).sort((a, b) => {
      const [startA] = a.split('-').map(Number);
      const [startB] = b.split('-').map(Number);
      return startB - startA; // Sort descending by epoch start
    });

    let totalEpochs = 0;
    const filteredData: Record<string, any> = {};
    let previousEntry: string | null = null;

    // Filter data based on range for operatorDataByRange
    for (const key of sortedKeys) {
      const [startEpoch, endEpoch] = key.split('-').map(Number);
      const epochDiff = endEpoch - startEpoch;

      if (totalEpochs + epochDiff > epochsInRange) {
        if (chainId === 1) {
          if (range === 'month' && !previousEntry) {
            previousEntry = key;
          }
        } else {
          if (range === 'week' && !previousEntry) {
            previousEntry = key;
          }
        }
        break;
      }

      filteredData[key] = operatorData[key];
      totalEpochs += epochDiff;
    }

    setOperatorDataByRange(filteredData);

    // Filter data for thresholdsByEpoch
    const thresholdsData = { ...filteredData };
    if (chainId === 1) {
      if (range === 'month' && previousEntry) {
        thresholdsData[previousEntry] = operatorDataRaw[previousEntry];
      }
    } else {
      if (range === 'week' && previousEntry && !thresholdsData[previousEntry]) {
        thresholdsData[previousEntry] = operatorDataRaw[previousEntry];
      }
    }

    setThresholdsByEpoch(
      Object.entries(thresholdsData)
        .map(([key, value]) => {
          // Guard against missing data
          if (
            !value ||
            !value.operators ||
            !value.operators[parsedNOId] ||
            typeof value.operators[parsedNOId].threshold !== 'number'
          ) {
            return null;
          }
          const endFrame = key.split('-')[1].toString();
          const lidoThreshold = (
            value.operators[parsedNOId].threshold * 100
          ).toFixed(4); // Convert to percentage with max 4 decimals

          const validatorRatios = value.operators[parsedNOId].validators;

          return {
            name: endFrame,
            lidoThreshold,
            ...validatorRatios,
          };
        })
        .filter(Boolean) // Remove nulls
        .reverse(), // Reverse for oldest first
    );
  }, [chainId, epochsInRange, operatorDataRaw, parsedNOId, range]);

  useEffect(() => {
    if (!operatorDataByRange) return;

    const statsPerValidator: { [key: string]: ValidatorStats[] } = {};
    const thresholds: number[] = [];

    // Process data for validatorsStats
    for (const key of Object.keys(operatorDataByRange)) {
      const validatorsData =
        operatorDataByRange[key]?.operators[parsedNOId]?.validators || {};

      thresholds.push(
        operatorDataByRange[key]?.operators[parsedNOId]?.threshold,
      );

      for (const validator of Object.keys(validatorsData)) {
        if (!statsPerValidator[validator]) {
          statsPerValidator[validator] = [];
        }

        const validatorPerf = validatorsData[validator].performance;
        // const attestations = {
        //   included: validatorPerf.included,
        //   assigned: validatorPerf.assigned,
        // };

        statsPerValidator[validator].push({
          index: parseInt(validator),
          attestations: {
            included: 100,
            assigned: 0,
          },
          efficiency: validatorPerf,
        });
      }
    }

    // Calculate average threshold
    setThreshold(
      thresholds.reduce((sum, value) => sum + value, 0) / thresholds.length,
    );

    const getValidatorStats = (
      data: Record<string, any[]>,
    ): ValidatorStats[] => {
      return Object.entries(data).map(([key, entries]) => {
        const totalAssigned = entries.reduce(
          (sum, entry) => sum + entry.attestations.assigned,
          0,
        );
        const totalIncluded = entries.reduce(
          (sum, entry) => sum + entry.attestations.included,
          0,
        );

        const totalEfficiency = entries.reduce(
          (sum, entry) => sum + (entry.efficiency || 0),
          0,
        );

        return {
          index: parseInt(key, 10),
          attestations: {
            assigned: totalAssigned,
            included: totalIncluded,
          },
          efficiency: totalEfficiency / entries.length,
        };
      });
    };

    // Calculate stats for validators
    const result = getValidatorStats(statsPerValidator);

    setValidatorsStats(result);
  }, [operatorDataByRange, parsedNOId, threshold]);

  return {
    isLoading,
    validatorsStats,
    threshold,
    thresholdsByEpoch,
  };
};
