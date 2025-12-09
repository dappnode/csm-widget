/* eslint-disable @typescript-eslint/no-unused-vars */
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

    // Example of operatorDataRaw structure:
    //     [
    //     {
    //         "frame": [
    //             52850,
    //             54424
    //         ],
    //         "operators": {
    //             "330": {
    //                 "distributed_rewards": 0,
    //                 "validators": {
    //                     "1236473": {
    //                         "performance": 0.9980952380952381,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9066196549913157
    //                     },
    //                     "1236474": {
    //                         "performance": 0.9968253968253968,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9066196549913157
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         "frame": [
    //             54425,
    //             55999
    //         ],
    //         "operators": {
    //             "330": {
    //                 "distributed_rewards": 0,
    //                 "validators": {
    //                     "1236473": {
    //                         "performance": 1,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9158714685009193
    //                     },
    //                     "1236474": {
    //                         "performance": 0.9993650793650793,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9158714685009193
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         "frame": [
    //             56000,
    //             57574
    //         ],
    //         "operators": {
    //             "330": {
    //                 "distributed_rewards": 0,
    //                 "validators": {
    //                     "1236473": {
    //                         "performance": 1,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9270561498332749
    //                     },
    //                     "1236474": {
    //                         "performance": 1,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9270561498332749
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         "frame": [
    //             57575,
    //             59149
    //         ],
    //         "operators": {
    //             "330": {
    //                 "distributed_rewards": 0,
    //                 "validators": {
    //                     "1236473": {
    //                         "performance": 0.9992576095025983,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9318850831318516
    //                     },
    //                     "1236474": {
    //                         "performance": 0.9992576095025983,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9318850831318516
    //                     },
    //                     "1251794": {
    //                         "performance": 1,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9318850831318516
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         "frame": [
    //             49700,
    //             51274
    //         ],
    //         "operators": {
    //             "330": {
    //                 "distributed_rewards": 0,
    //                 "validators": {
    //                     "1236473": {
    //                         "performance": 0.9936215450035436,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9376923237837359
    //                     },
    //                     "1236474": {
    //                         "performance": 0.9922041105598866,
    //                         "slashed": false,
    //                         "strikes": 0,
    //                         "threshold": 0.9376923237837359
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // ]

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

  // useEffect(() => {
  //   if (!operatorDataByRange) return;

  //   const statsPerValidator: { [key: string]: ValidatorStats[] } = {};
  //   const thresholds: number[] = [];

  //   // Process data for validatorsStats
  //   for (const key of Object.keys(operatorDataByRange)) {
  //     const validatorsData = operatorDataByRange[key]?.data?.validators || {};
  //     thresholds.push(operatorDataByRange[key]?.threshold);

  //     for (const validator of Object.keys(validatorsData)) {
  //       if (!statsPerValidator[validator]) {
  //         statsPerValidator[validator] = [];
  //       }

  //       const validatorPerf = validatorsData[validator].perf;
  //       const attestations = {
  //         included: validatorPerf.included,
  //         assigned: validatorPerf.assigned,
  //       };

  //       statsPerValidator[validator].push({
  //         index: parseInt(validator),
  //         attestations,
  //         efficiency: validatorPerf.included / validatorPerf.assigned,
  //       });
  //     }
  //   }

  //   // Calculate average threshold
  //   setThreshold(
  //     thresholds.reduce((sum, value) => sum + value, 0) / thresholds.length,
  //   );

  //   const getValidatorStats = (
  //     data: Record<string, any[]>,
  //   ): ValidatorStats[] => {
  //     return Object.entries(data).map(([key, entries]) => {
  //       const totalAssigned = entries.reduce(
  //         (sum, entry) => sum + entry.attestations.assigned,
  //         0,
  //       );
  //       const totalIncluded = entries.reduce(
  //         (sum, entry) => sum + entry.attestations.included,
  //         0,
  //       );
  //       const totalEfficiency = entries.reduce(
  //         (sum, entry) => sum + (entry.efficiency || 0),
  //         0,
  //       );

  //       return {
  //         index: parseInt(key, 10),
  //         attestations: {
  //           assigned: totalAssigned,
  //           included: totalIncluded,
  //         },
  //         efficiency: totalEfficiency / entries.length,
  //       };
  //     });
  //   };

  //   // Calculate stats for validators
  //   const result = getValidatorStats(statsPerValidator);
  //   setValidatorsStats(result);
  // }, [operatorDataByRange]);

  return {
    isLoading,
    validatorsStats,
    threshold,
    thresholdsByEpoch,
  };
};
