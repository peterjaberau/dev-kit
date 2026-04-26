import { setup, assign, and, not, or, createMachine } from "xstate"

export const savageMachine = createMachine({
  context: ({ input }: any) => ({
    wounds: 0,
    distractedTimer: -1,
    vulnerableTimer: -1,
    isWildCard: input.isWildCard ?? true,
    hardy: input.hardy ?? false,
    maxWounds: 1,
    ownTurn: false,
    onHold: false,
    holdUsed: false,
    interruptedSuccessfully: false,
    injuries: [],
    grappledBy: "",
    afflictionTimer: -1,
    activeEffects: [],
  }),
  id: "savage",
  initial: "alive",
  states: {
    alive: {
      states: {
        damageTrack: {
          initial: "active",
          states: {
            active: {
              initial: "unshaken",
              states: {
                unshaken: {
                  on: {
                    TAKE_DAMAGE: [
                      {
                        target: "#savage.dead",
                        guard: "extraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.active.unshaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "inline:savage.alive.damageTrack.active.unshaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.stable",
                        guard: "inline:savage.alive.damageTrack.active.unshaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                          {
                            type: "appendInjury",
                          },
                        ],
                      },
                      {
                        guard: "allSoaked",
                        actions: [],
                      },
                      {
                        target: "shaken",
                        guard: "woundsNotExceedMax",
                        actions: [
                          {
                            type: "addWounds",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        guard: "marginNonNeg",
                        actions: [],
                      },
                    ],
                    _LETHAL_TICK: [
                      {
                        target: "#savage.dead",
                        guard: "lethalExtraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "lethalExceedsMax",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        actions: [
                          {
                            type: "lethalAddWound",
                          },
                        ],
                      },
                    ],
                  },
                },
                shaken: {
                  on: {
                    TAKE_DAMAGE: [
                      {
                        target: "#savage.dead",
                        guard: "extraDiesShaken",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.stable",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                          {
                            type: "appendInjury",
                          },
                        ],
                      },
                      {
                        target: "wounded",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "unshaken",
                        guard: "allSoakedShaken",
                        actions: [],
                      },
                      {
                        guard: "woundsNotExceedMaxShaken",
                        actions: [
                          {
                            type: "addWoundsShaken",
                          },
                        ],
                      },
                    ],
                    START_OF_TURN: [
                      {
                        target: "wounded",
                        guard: "inline:savage.alive.damageTrack.active.shaken#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "unshaken",
                        guard: "inline:savage.alive.damageTrack.active.shaken#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                    SPEND_BENNY: [
                      {
                        target: "wounded",
                        guard: "hasWounds",
                        actions: [],
                      },
                      {
                        target: "unshaken",
                        actions: [],
                      },
                    ],
                    HEAL: [
                      {
                        guard: "hasWounds",
                        actions: [
                          {
                            type: "healWounds",
                          },
                        ],
                      },
                    ],
                    _LETHAL_TICK: [
                      {
                        target: "#savage.dead",
                        guard: "lethalExtraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "lethalExceedsMax",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        actions: [
                          {
                            type: "lethalAddWound",
                          },
                        ],
                      },
                    ],
                  },
                },
                wounded: {
                  on: {
                    TAKE_DAMAGE: [
                      {
                        target: "#savage.dead",
                        guard: "extraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.active.wounded#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "inline:savage.alive.damageTrack.active.wounded#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.stable",
                        guard: "inline:savage.alive.damageTrack.active.wounded#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                          {
                            type: "appendInjury",
                          },
                        ],
                      },
                      {
                        guard: "allSoaked",
                        actions: [],
                      },
                      {
                        target: "shaken",
                        guard: "woundsNotExceedMax",
                        actions: [
                          {
                            type: "addWounds",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        guard: "marginNonNeg",
                        actions: [],
                      },
                    ],
                    HEAL: [
                      {
                        target: "unshaken",
                        guard: "healToZero",
                        actions: [
                          {
                            type: "healWounds",
                          },
                        ],
                      },
                      {
                        actions: [
                          {
                            type: "healWounds",
                          },
                        ],
                      },
                    ],
                    _LETHAL_TICK: [
                      {
                        target: "#savage.dead",
                        guard: "lethalExtraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "lethalExceedsMax",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        actions: [
                          {
                            type: "lethalAddWound",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            incapacitated: {
              initial: "stable",
              states: {
                stable: {},
                bleedingOut: {
                  on: {
                    START_OF_TURN: [
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.incapacitated.bleedingOut#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "stable",
                        guard: "inline:savage.alive.damageTrack.incapacitated.bleedingOut#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
              },
              on: {
                HEAL: [
                  {
                    target: "#savage.alive.damageTrack.active.unshaken",
                    guard: "healToZero",
                    actions: [
                      {
                        type: "healWounds",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.damageTrack.active.wounded",
                    guard: "hasWounds",
                    actions: [
                      {
                        type: "healWounds",
                      },
                    ],
                  },
                ],
                FINISHING_MOVE: [
                  {
                    target: "#savage.dead",
                    actions: [],
                  },
                ],
              },
            },
          },
        },
        conditionTrack: {
          states: {
            stun: {
              initial: "normal",
              states: {
                normal: {
                  on: {
                    APPLY_STUNNED: [
                      {
                        target: "stunned",
                        guard: "inline:savage.alive.conditionTrack.stun.normal#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "raiseDropProne",
                          },
                        ],
                      },
                    ],
                  },
                },
                stunned: {
                  always: {
                    target: "normal",
                    guard: "inline:savage.alive.conditionTrack.stun.stunned#always[-1]#guard",
                    actions: [],
                  },
                  on: {
                    APPLY_STUNNED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.stun.stunned#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "raiseDropProne",
                          },
                        ],
                      },
                    ],
                    START_OF_TURN: [
                      {
                        target: "normal",
                        guard: "inline:savage.alive.conditionTrack.stun.stunned#START_OF_TURN[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerRecoveryRaise",
                          },
                        ],
                      },
                      {
                        target: "normal",
                        guard: "inline:savage.alive.conditionTrack.stun.stunned#START_OF_TURN[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerRecoverySuccess",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            distraction: {
              initial: "clear",
              states: {
                clear: {
                  on: {
                    APPLY_DISTRACTED: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#APPLY_DISTRACTED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_STUNNED: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                  },
                },
                distracted: {
                  always: {
                    target: "clear",
                    guard: "inline:savage.alive.conditionTrack.distraction.distracted#always[-1]#guard",
                    actions: [],
                  },
                  on: {
                    APPLY_DISTRACTED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#APPLY_DISTRACTED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_STUNNED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            vulnerability: {
              initial: "clear",
              states: {
                clear: {
                  on: {
                    APPLY_VULNERABLE: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#APPLY_VULNERABLE[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_ENTANGLED: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#APPLY_ENTANGLED[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerPersistent",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    START_OF_TURN: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                vulnerable: {
                  always: {
                    target: "clear",
                    guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#always[-1]#guard",
                    actions: [],
                  },
                  on: {
                    APPLY_VULNERABLE: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#APPLY_VULNERABLE[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_ENTANGLED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#APPLY_ENTANGLED[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerPersistent",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            vision: {
              initial: "clear",
              states: {
                clear: {
                  on: {
                    APPLY_BLINDED: [
                      {
                        target: "blinded",
                        guard: "inline:savage.alive.conditionTrack.vision.clear#APPLY_BLINDED[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "impaired",
                        guard: "inline:savage.alive.conditionTrack.vision.clear#APPLY_BLINDED[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                blinded: {
                  always: [
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.blinded#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.blinded#always[-1]#guard",
                      actions: [],
                    },
                  ],
                  on: {
                    END_OF_TURN: [
                      {
                        target: "clear",
                        guard: "inline:savage.alive.conditionTrack.vision.blinded#END_OF_TURN[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "impaired",
                        guard: "inline:savage.alive.conditionTrack.vision.blinded#END_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                impaired: {
                  always: [
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.impaired#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.impaired#always[-1]#guard",
                      actions: [],
                    },
                  ],
                  on: {
                    APPLY_BLINDED: [
                      {
                        target: "blinded",
                        guard: "inline:savage.alive.conditionTrack.vision.impaired#APPLY_BLINDED[-1]#guard",
                        actions: [],
                      },
                    ],
                    END_OF_TURN: [
                      {
                        target: "clear",
                        guard: "inline:savage.alive.conditionTrack.vision.impaired#END_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
              },
            },
            defense: {
              initial: "notDefending",
              states: {
                notDefending: {
                  on: {
                    DEFEND: [
                      {
                        target: "defending",
                        guard: "inline:savage.alive.conditionTrack.defense.notDefending#DEFEND[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                defending: {
                  always: [
                    {
                      target: "notDefending",
                      guard: "inline:savage.alive.conditionTrack.defense.defending#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "notDefending",
                      guard: "inline:savage.alive.conditionTrack.defense.defending#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "notDefending",
                      guard: "inline:savage.alive.conditionTrack.defense.defending#always[-1]#guard",
                      actions: [],
                    },
                  ],
                  on: {
                    START_OF_TURN: [
                      {
                        target: "notDefending",
                        guard: "inline:savage.alive.conditionTrack.defense.defending#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
              },
            },
          },
          type: "parallel",
        },
        fatigueTrack: {
          initial: "fresh",
          states: {
            fresh: {
              on: {
                APPLY_FATIGUE: [
                  {
                    target: "fatigued",
                    actions: [],
                  },
                ],
              },
            },
            fatigued: {
              on: {
                APPLY_FATIGUE: [
                  {
                    target: "exhausted",
                    actions: [],
                  },
                ],
                RECOVER_FATIGUE: [
                  {
                    target: "fresh",
                    actions: [],
                  },
                ],
              },
            },
            exhausted: {
              on: {
                APPLY_FATIGUE: [
                  {
                    target: "incapByFatigue",
                    actions: [],
                  },
                ],
                RECOVER_FATIGUE: [
                  {
                    target: "fatigued",
                    actions: [],
                  },
                ],
              },
            },
            incapByFatigue: {
              on: {
                RECOVER_FATIGUE: [
                  {
                    target: "exhausted",
                    actions: [],
                  },
                ],
              },
            },
          },
        },
        turnPhase: {
          initial: "idle",
          states: {
            idle: {
              on: {
                START_OF_TURN: [
                  {
                    target: "holdingAction",
                    guard: "isOnHold",
                    actions: [
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "acting",
                    actions: [
                      {
                        type: "setOwnTurnTrue",
                      },
                      {
                        type: "clearHoldUsed",
                      },
                    ],
                  },
                ],
              },
            },
            holdingAction: {
              always: [
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
              ],
              on: {
                ACT_FROM_HOLD: [
                  {
                    target: "acting",
                    actions: [
                      {
                        type: "clearOnHold",
                      },
                      {
                        type: "setOwnTurnTrue",
                      },
                    ],
                  },
                ],
                INTERRUPT: [
                  {
                    target: "acting",
                    guard: "interruptSuccess",
                    actions: [
                      {
                        type: "clearOnHold",
                      },
                      {
                        type: "setOwnTurnTrue",
                      },
                      {
                        type: "setInterruptSuccess",
                      },
                    ],
                  },
                  {
                    target: "acting",
                    actions: [
                      {
                        type: "clearOnHold",
                      },
                      {
                        type: "setOwnTurnTrue",
                      },
                      {
                        type: "setInterruptFail",
                      },
                    ],
                  },
                ],
                END_OF_TURN: [
                  {
                    target: "idle",
                    actions: [
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                ],
              },
            },
            acting: {
              on: {
                END_OF_TURN: [
                  {
                    target: "idle",
                    guard: "inline:savage.alive.turnPhase.acting#END_OF_TURN[-1]#guard",
                    actions: [
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "idle",
                    guard: "inline:savage.alive.turnPhase.acting#END_OF_TURN[-1]#guard",
                    actions: [
                      {
                        type: "tickVulnerableOnly",
                      },
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "idle",
                    guard: "inline:savage.alive.turnPhase.acting#END_OF_TURN[-1]#guard",
                    actions: [
                      {
                        type: "tickDistractedOnly",
                      },
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "idle",
                    actions: [
                      {
                        type: "tickTimers",
                      },
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                ],
                GO_ON_HOLD: [
                  {
                    target: "holdingAction",
                    guard: "inline:savage.alive.turnPhase.acting#GO_ON_HOLD[-1]#guard",
                    actions: [
                      {
                        type: "setOnHold",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        positionTrack: {
          initial: "standing",
          states: {
            standing: {
              on: {
                DROP_PRONE: [
                  {
                    target: "prone",
                    guard: "inline:savage.alive.positionTrack.standing#DROP_PRONE[-1]#guard",
                    actions: [],
                  },
                ],
              },
            },
            prone: {
              always: {
                target: "standing",
                guard: "inline:savage.alive.positionTrack.prone#always[-1]#guard",
                actions: [],
              },
              on: {
                STAND_UP: [
                  {
                    target: "standing",
                    guard: "inline:savage.alive.positionTrack.prone#STAND_UP[-1]#guard",
                    actions: [],
                  },
                ],
              },
            },
          },
        },
        restraintTrack: {
          initial: "free",
          states: {
            free: {
              on: {
                APPLY_ENTANGLED: [
                  {
                    target: "entangled",
                    guard: "inline:savage.alive.restraintTrack.free#APPLY_ENTANGLED[-1]#guard",
                    actions: [
                      {
                        type: "setVulnerableTimerPersistent",
                      },
                    ],
                  },
                ],
                APPLY_BOUND: [
                  {
                    target: "bound",
                    guard: "inline:savage.alive.restraintTrack.free#APPLY_BOUND[-1]#guard",
                    actions: [],
                  },
                ],
                GRAPPLE_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "inline:savage.alive.restraintTrack.free#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "inline:savage.alive.restraintTrack.free#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            entangled: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.entangled#always[-1]#guard",
                  actions: [],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.entangled#always[-1]#guard",
                  actions: [],
                },
              ],
              on: {
                APPLY_BOUND: [
                  {
                    target: "bound",
                    guard: "inline:savage.alive.restraintTrack.entangled#APPLY_BOUND[-1]#guard",
                    actions: [],
                  },
                ],
                ESCAPE_ATTEMPT: [
                  {
                    target: "free",
                    guard: "escapeSuccess",
                    actions: [
                      {
                        type: "clearVulnerableTimer",
                      },
                    ],
                  },
                ],
                GRAPPLE_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "inline:savage.alive.restraintTrack.entangled#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "inline:savage.alive.restraintTrack.entangled#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            bound: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.bound#always[-1]#guard",
                  actions: [],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.bound#always[-1]#guard",
                  actions: [],
                },
              ],
              on: {
                ESCAPE_ATTEMPT: [
                  {
                    target: "free",
                    guard: "escapeRaise",
                    actions: [
                      {
                        type: "clearDistractedTimer",
                      },
                      {
                        type: "clearVulnerableTimer",
                      },
                    ],
                  },
                  {
                    target: "entangled",
                    guard: "escapeSuccess",
                    actions: [],
                  },
                ],
                GRAPPLE_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "inline:savage.alive.restraintTrack.bound#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "inline:savage.alive.restraintTrack.bound#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            pinned: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.pinned#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.pinned#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
              ],
              on: {
                GRAPPLE_ESCAPE: [
                  {
                    target: "free",
                    guard: "grappleEscapeRaise",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "grappleEscapeSuccessNoRaise",
                    actions: [],
                  },
                ],
                APPLY_BOUND: [
                  {
                    target: "bound",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            grabbed: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.grabbed#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.grabbed#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
              ],
              on: {
                PIN_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "pinSuccess",
                    actions: [],
                  },
                ],
                GRAPPLE_ESCAPE: [
                  {
                    target: "free",
                    guard: "grappleEscapeSuccess",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                ],
                APPLY_BOUND: [
                  {
                    target: "bound",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        afflictionTrack: {
          initial: "healthy",
          states: {
            healthy: {
              on: {
                APPLY_AFFLICTION: [
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.paralytic",
                    guard: "afflictionParalytic",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.weak",
                    guard: "afflictionWeak",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseFatigue",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.lethal",
                    guard: "afflictionLethal",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseLethalTick",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.sleep",
                    guard: "afflictionSleep",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                ],
              },
            },
            afflicted: {
              initial: "paralytic",
              states: {
                paralytic: {},
                weak: {},
                lethal: {
                  always: {
                    target: "#savage.dead",
                    guard: "afflictionTimerExpired",
                    actions: [
                      {
                        type: "clearAfflictionTimer",
                      },
                    ],
                  },
                },
                sleep: {},
              },
              always: {
                target: "healthy",
                guard: "afflictionTimerExpired",
                actions: [
                  {
                    type: "clearAfflictionTimer",
                  },
                ],
              },
              on: {
                CURE_AFFLICTION: [
                  {
                    target: "healthy",
                    actions: [
                      {
                        type: "clearAfflictionTimer",
                      },
                    ],
                  },
                ],
                APPLY_AFFLICTION: [
                  {
                    target: ".paralytic",
                    guard: "afflictionParalytic",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                  {
                    target: ".weak",
                    guard: "afflictionWeak",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseFatigue",
                      },
                    ],
                  },
                  {
                    target: ".lethal",
                    guard: "afflictionLethal",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseLethalTick",
                      },
                    ],
                  },
                  {
                    target: ".sleep",
                    guard: "afflictionSleep",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      on: {
        APPLY_POWER_EFFECT: [
          {
            guard: "durationPositive",
            actions: [
              {
                type: "applyPowerEffect",
              },
            ],
          },
        ],
        DISMISS_EFFECT: [
          {
            actions: [
              {
                type: "dismissEffect",
              },
            ],
          },
        ],
        BACKLASH: [
          {
            actions: [
              {
                type: "backlashClearEffects",
              },
              {
                type: "raiseFatigue",
              },
            ],
          },
        ],
      },
      type: "parallel",
    },
    dead: {
      entry: {
        type: "inline:savage.dead#entry[0]",
      },
      type: "final",
    },
  },
  on: {
    SET_HARDY: [
      {
        actions: [
          {
            type: "inline:savage#SET_HARDY[-1]#transition[0]",
          },
        ],
      },
    ],
  },
})




const j = {
  context:
    '{{({ input }) => ({\n        wounds: wounds(0),\n        distractedTimer: conditionTimer(-1),\n        vulnerableTimer: conditionTimer(-1),\n        isWildCard: input.isWildCard ?? true,\n        hardy: input.hardy ?? false,\n        maxWounds: maxWounds((input.isWildCard ?? true) ? 3 : 1),\n        ownTurn: false,\n        onHold: false,\n        holdUsed: false,\n        interruptedSuccessfully: false,\n        injuries: [],\n        grappledBy: "",\n        afflictionTimer: -1,\n        activeEffects: []\n    })}}',
  id: "savage",
  initial: "alive",
  states: {
    alive: {
      states: {
        damageTrack: {
          initial: "active",
          states: {
            active: {
              initial: "unshaken",
              states: {
                unshaken: {
                  on: {
                    TAKE_DAMAGE: [
                      {
                        target: "#savage.dead",
                        guard: "extraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.active.unshaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "inline:savage.alive.damageTrack.active.unshaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.stable",
                        guard: "inline:savage.alive.damageTrack.active.unshaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                          {
                            type: "appendInjury",
                          },
                        ],
                      },
                      {
                        guard: "allSoaked",
                        actions: [],
                      },
                      {
                        target: "shaken",
                        guard: "woundsNotExceedMax",
                        actions: [
                          {
                            type: "addWounds",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        guard: "marginNonNeg",
                        actions: [],
                      },
                    ],
                    _LETHAL_TICK: [
                      {
                        target: "#savage.dead",
                        guard: "lethalExtraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "lethalExceedsMax",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        actions: [
                          {
                            type: "lethalAddWound",
                          },
                        ],
                      },
                    ],
                  },
                },
                shaken: {
                  on: {
                    TAKE_DAMAGE: [
                      {
                        target: "#savage.dead",
                        guard: "extraDiesShaken",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.stable",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                          {
                            type: "appendInjury",
                          },
                        ],
                      },
                      {
                        target: "wounded",
                        guard: "inline:savage.alive.damageTrack.active.shaken#TAKE_DAMAGE[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "unshaken",
                        guard: "allSoakedShaken",
                        actions: [],
                      },
                      {
                        guard: "woundsNotExceedMaxShaken",
                        actions: [
                          {
                            type: "addWoundsShaken",
                          },
                        ],
                      },
                    ],
                    START_OF_TURN: [
                      {
                        target: "wounded",
                        guard: "inline:savage.alive.damageTrack.active.shaken#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "unshaken",
                        guard: "inline:savage.alive.damageTrack.active.shaken#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                    SPEND_BENNY: [
                      {
                        target: "wounded",
                        guard: "hasWounds",
                        actions: [],
                      },
                      {
                        target: "unshaken",
                        actions: [],
                      },
                    ],
                    HEAL: [
                      {
                        guard: "hasWounds",
                        actions: [
                          {
                            type: "healWounds",
                          },
                        ],
                      },
                    ],
                    _LETHAL_TICK: [
                      {
                        target: "#savage.dead",
                        guard: "lethalExtraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "lethalExceedsMax",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        actions: [
                          {
                            type: "lethalAddWound",
                          },
                        ],
                      },
                    ],
                  },
                },
                wounded: {
                  on: {
                    TAKE_DAMAGE: [
                      {
                        target: "#savage.dead",
                        guard: "extraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.active.wounded#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "inline:savage.alive.damageTrack.active.wounded#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.stable",
                        guard: "inline:savage.alive.damageTrack.active.wounded#TAKE_DAMAGE[-1]#guard",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                          {
                            type: "appendInjury",
                          },
                        ],
                      },
                      {
                        guard: "allSoaked",
                        actions: [],
                      },
                      {
                        target: "shaken",
                        guard: "woundsNotExceedMax",
                        actions: [
                          {
                            type: "addWounds",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        guard: "marginNonNeg",
                        actions: [],
                      },
                    ],
                    HEAL: [
                      {
                        target: "unshaken",
                        guard: "healToZero",
                        actions: [
                          {
                            type: "healWounds",
                          },
                        ],
                      },
                      {
                        actions: [
                          {
                            type: "healWounds",
                          },
                        ],
                      },
                    ],
                    _LETHAL_TICK: [
                      {
                        target: "#savage.dead",
                        guard: "lethalExtraDies",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "#savage.alive.damageTrack.incapacitated.bleedingOut",
                        guard: "lethalExceedsMax",
                        actions: [
                          {
                            type: "setWoundsToMax",
                          },
                        ],
                      },
                      {
                        target: "shaken",
                        actions: [
                          {
                            type: "lethalAddWound",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            incapacitated: {
              initial: "stable",
              states: {
                stable: {},
                bleedingOut: {
                  on: {
                    START_OF_TURN: [
                      {
                        target: "#savage.dead",
                        guard: "inline:savage.alive.damageTrack.incapacitated.bleedingOut#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "stable",
                        guard: "inline:savage.alive.damageTrack.incapacitated.bleedingOut#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
              },
              on: {
                HEAL: [
                  {
                    target: "#savage.alive.damageTrack.active.unshaken",
                    guard: "healToZero",
                    actions: [
                      {
                        type: "healWounds",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.damageTrack.active.wounded",
                    guard: "hasWounds",
                    actions: [
                      {
                        type: "healWounds",
                      },
                    ],
                  },
                ],
                FINISHING_MOVE: [
                  {
                    target: "#savage.dead",
                    actions: [],
                  },
                ],
              },
            },
          },
        },
        conditionTrack: {
          states: {
            stun: {
              initial: "normal",
              states: {
                normal: {
                  on: {
                    APPLY_STUNNED: [
                      {
                        target: "stunned",
                        guard: "inline:savage.alive.conditionTrack.stun.normal#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "raiseDropProne",
                          },
                        ],
                      },
                    ],
                  },
                },
                stunned: {
                  always: {
                    target: "normal",
                    guard: "inline:savage.alive.conditionTrack.stun.stunned#always[-1]#guard",
                    actions: [],
                  },
                  on: {
                    APPLY_STUNNED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.stun.stunned#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "raiseDropProne",
                          },
                        ],
                      },
                    ],
                    START_OF_TURN: [
                      {
                        target: "normal",
                        guard: "inline:savage.alive.conditionTrack.stun.stunned#START_OF_TURN[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerRecoveryRaise",
                          },
                        ],
                      },
                      {
                        target: "normal",
                        guard: "inline:savage.alive.conditionTrack.stun.stunned#START_OF_TURN[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerRecoverySuccess",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            distraction: {
              initial: "clear",
              states: {
                clear: {
                  on: {
                    APPLY_DISTRACTED: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#APPLY_DISTRACTED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_STUNNED: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        target: "distracted",
                        guard: "inline:savage.alive.conditionTrack.distraction.clear#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                  },
                },
                distracted: {
                  always: {
                    target: "clear",
                    guard: "inline:savage.alive.conditionTrack.distraction.distracted#always[-1]#guard",
                    actions: [],
                  },
                  on: {
                    APPLY_DISTRACTED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#APPLY_DISTRACTED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_STUNNED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#APPLY_STUNNED[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        guard: "inline:savage.alive.conditionTrack.distraction.distracted#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setDistractedTimer",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            vulnerability: {
              initial: "clear",
              states: {
                clear: {
                  on: {
                    APPLY_VULNERABLE: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#APPLY_VULNERABLE[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_ENTANGLED: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#APPLY_ENTANGLED[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerPersistent",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    START_OF_TURN: [
                      {
                        target: "vulnerable",
                        guard: "inline:savage.alive.conditionTrack.vulnerability.clear#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                vulnerable: {
                  always: {
                    target: "clear",
                    guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#always[-1]#guard",
                    actions: [],
                  },
                  on: {
                    APPLY_VULNERABLE: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#APPLY_VULNERABLE[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    APPLY_ENTANGLED: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#APPLY_ENTANGLED[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimerPersistent",
                          },
                        ],
                      },
                    ],
                    APPLY_BOUND: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#APPLY_BOUND[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                    GRAPPLE_ATTEMPT: [
                      {
                        guard: "inline:savage.alive.conditionTrack.vulnerability.vulnerable#GRAPPLE_ATTEMPT[-1]#guard",
                        actions: [
                          {
                            type: "setVulnerableTimer",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            vision: {
              initial: "clear",
              states: {
                clear: {
                  on: {
                    APPLY_BLINDED: [
                      {
                        target: "blinded",
                        guard: "inline:savage.alive.conditionTrack.vision.clear#APPLY_BLINDED[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "impaired",
                        guard: "inline:savage.alive.conditionTrack.vision.clear#APPLY_BLINDED[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                blinded: {
                  always: [
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.blinded#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.blinded#always[-1]#guard",
                      actions: [],
                    },
                  ],
                  on: {
                    END_OF_TURN: [
                      {
                        target: "clear",
                        guard: "inline:savage.alive.conditionTrack.vision.blinded#END_OF_TURN[-1]#guard",
                        actions: [],
                      },
                      {
                        target: "impaired",
                        guard: "inline:savage.alive.conditionTrack.vision.blinded#END_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                impaired: {
                  always: [
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.impaired#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "clear",
                      guard: "inline:savage.alive.conditionTrack.vision.impaired#always[-1]#guard",
                      actions: [],
                    },
                  ],
                  on: {
                    APPLY_BLINDED: [
                      {
                        target: "blinded",
                        guard: "inline:savage.alive.conditionTrack.vision.impaired#APPLY_BLINDED[-1]#guard",
                        actions: [],
                      },
                    ],
                    END_OF_TURN: [
                      {
                        target: "clear",
                        guard: "inline:savage.alive.conditionTrack.vision.impaired#END_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
              },
            },
            defense: {
              initial: "notDefending",
              states: {
                notDefending: {
                  on: {
                    DEFEND: [
                      {
                        target: "defending",
                        guard: "inline:savage.alive.conditionTrack.defense.notDefending#DEFEND[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
                defending: {
                  always: [
                    {
                      target: "notDefending",
                      guard: "inline:savage.alive.conditionTrack.defense.defending#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "notDefending",
                      guard: "inline:savage.alive.conditionTrack.defense.defending#always[-1]#guard",
                      actions: [],
                    },
                    {
                      target: "notDefending",
                      guard: "inline:savage.alive.conditionTrack.defense.defending#always[-1]#guard",
                      actions: [],
                    },
                  ],
                  on: {
                    START_OF_TURN: [
                      {
                        target: "notDefending",
                        guard: "inline:savage.alive.conditionTrack.defense.defending#START_OF_TURN[-1]#guard",
                        actions: [],
                      },
                    ],
                  },
                },
              },
            },
          },
          type: "parallel",
        },
        fatigueTrack: {
          initial: "fresh",
          states: {
            fresh: {
              on: {
                APPLY_FATIGUE: [
                  {
                    target: "fatigued",
                    actions: [],
                  },
                ],
              },
            },
            fatigued: {
              on: {
                APPLY_FATIGUE: [
                  {
                    target: "exhausted",
                    actions: [],
                  },
                ],
                RECOVER_FATIGUE: [
                  {
                    target: "fresh",
                    actions: [],
                  },
                ],
              },
            },
            exhausted: {
              on: {
                APPLY_FATIGUE: [
                  {
                    target: "incapByFatigue",
                    actions: [],
                  },
                ],
                RECOVER_FATIGUE: [
                  {
                    target: "fatigued",
                    actions: [],
                  },
                ],
              },
            },
            incapByFatigue: {
              on: {
                RECOVER_FATIGUE: [
                  {
                    target: "exhausted",
                    actions: [],
                  },
                ],
              },
            },
          },
        },
        turnPhase: {
          initial: "idle",
          states: {
            idle: {
              on: {
                START_OF_TURN: [
                  {
                    target: "holdingAction",
                    guard: "isOnHold",
                    actions: [
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "acting",
                    actions: [
                      {
                        type: "setOwnTurnTrue",
                      },
                      {
                        type: "clearHoldUsed",
                      },
                    ],
                  },
                ],
              },
            },
            holdingAction: {
              always: [
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
                {
                  target: "idle",
                  guard: "inline:savage.alive.turnPhase.holdingAction#always[-1]#guard",
                  actions: [
                    {
                      type: "clearOnHold",
                    },
                    {
                      type: "setOwnTurnFalse",
                    },
                  ],
                },
              ],
              on: {
                ACT_FROM_HOLD: [
                  {
                    target: "acting",
                    actions: [
                      {
                        type: "clearOnHold",
                      },
                      {
                        type: "setOwnTurnTrue",
                      },
                    ],
                  },
                ],
                INTERRUPT: [
                  {
                    target: "acting",
                    guard: "interruptSuccess",
                    actions: [
                      {
                        type: "clearOnHold",
                      },
                      {
                        type: "setOwnTurnTrue",
                      },
                      {
                        type: "setInterruptSuccess",
                      },
                    ],
                  },
                  {
                    target: "acting",
                    actions: [
                      {
                        type: "clearOnHold",
                      },
                      {
                        type: "setOwnTurnTrue",
                      },
                      {
                        type: "setInterruptFail",
                      },
                    ],
                  },
                ],
                END_OF_TURN: [
                  {
                    target: "idle",
                    actions: [
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                ],
              },
            },
            acting: {
              on: {
                END_OF_TURN: [
                  {
                    target: "idle",
                    guard: "inline:savage.alive.turnPhase.acting#END_OF_TURN[-1]#guard",
                    actions: [
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "idle",
                    guard: "inline:savage.alive.turnPhase.acting#END_OF_TURN[-1]#guard",
                    actions: [
                      {
                        type: "tickVulnerableOnly",
                      },
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "idle",
                    guard: "inline:savage.alive.turnPhase.acting#END_OF_TURN[-1]#guard",
                    actions: [
                      {
                        type: "tickDistractedOnly",
                      },
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                  {
                    target: "idle",
                    actions: [
                      {
                        type: "tickTimers",
                      },
                      {
                        type: "tickAfflictionTimer",
                      },
                      {
                        type: "tickEffectTimers",
                      },
                      {
                        type: "setOwnTurnFalse",
                      },
                    ],
                  },
                ],
                GO_ON_HOLD: [
                  {
                    target: "holdingAction",
                    guard: "inline:savage.alive.turnPhase.acting#GO_ON_HOLD[-1]#guard",
                    actions: [
                      {
                        type: "setOnHold",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        positionTrack: {
          initial: "standing",
          states: {
            standing: {
              on: {
                DROP_PRONE: [
                  {
                    target: "prone",
                    guard: "inline:savage.alive.positionTrack.standing#DROP_PRONE[-1]#guard",
                    actions: [],
                  },
                ],
              },
            },
            prone: {
              always: {
                target: "standing",
                guard: "inline:savage.alive.positionTrack.prone#always[-1]#guard",
                actions: [],
              },
              on: {
                STAND_UP: [
                  {
                    target: "standing",
                    guard: "inline:savage.alive.positionTrack.prone#STAND_UP[-1]#guard",
                    actions: [],
                  },
                ],
              },
            },
          },
        },
        restraintTrack: {
          initial: "free",
          states: {
            free: {
              on: {
                APPLY_ENTANGLED: [
                  {
                    target: "entangled",
                    guard: "inline:savage.alive.restraintTrack.free#APPLY_ENTANGLED[-1]#guard",
                    actions: [
                      {
                        type: "setVulnerableTimerPersistent",
                      },
                    ],
                  },
                ],
                APPLY_BOUND: [
                  {
                    target: "bound",
                    guard: "inline:savage.alive.restraintTrack.free#APPLY_BOUND[-1]#guard",
                    actions: [],
                  },
                ],
                GRAPPLE_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "inline:savage.alive.restraintTrack.free#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "inline:savage.alive.restraintTrack.free#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            entangled: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.entangled#always[-1]#guard",
                  actions: [],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.entangled#always[-1]#guard",
                  actions: [],
                },
              ],
              on: {
                APPLY_BOUND: [
                  {
                    target: "bound",
                    guard: "inline:savage.alive.restraintTrack.entangled#APPLY_BOUND[-1]#guard",
                    actions: [],
                  },
                ],
                ESCAPE_ATTEMPT: [
                  {
                    target: "free",
                    guard: "escapeSuccess",
                    actions: [
                      {
                        type: "clearVulnerableTimer",
                      },
                    ],
                  },
                ],
                GRAPPLE_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "inline:savage.alive.restraintTrack.entangled#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "inline:savage.alive.restraintTrack.entangled#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            bound: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.bound#always[-1]#guard",
                  actions: [],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.bound#always[-1]#guard",
                  actions: [],
                },
              ],
              on: {
                ESCAPE_ATTEMPT: [
                  {
                    target: "free",
                    guard: "escapeRaise",
                    actions: [
                      {
                        type: "clearDistractedTimer",
                      },
                      {
                        type: "clearVulnerableTimer",
                      },
                    ],
                  },
                  {
                    target: "entangled",
                    guard: "escapeSuccess",
                    actions: [],
                  },
                ],
                GRAPPLE_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "inline:savage.alive.restraintTrack.bound#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "inline:savage.alive.restraintTrack.bound#GRAPPLE_ATTEMPT[-1]#guard",
                    actions: [
                      {
                        type: "setGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            pinned: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.pinned#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.pinned#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
              ],
              on: {
                GRAPPLE_ESCAPE: [
                  {
                    target: "free",
                    guard: "grappleEscapeRaise",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                  {
                    target: "grabbed",
                    guard: "grappleEscapeSuccessNoRaise",
                    actions: [],
                  },
                ],
                APPLY_BOUND: [
                  {
                    target: "bound",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
            grabbed: {
              always: [
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.grabbed#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
                {
                  target: "free",
                  guard: "inline:savage.alive.restraintTrack.grabbed#always[-1]#guard",
                  actions: [
                    {
                      type: "clearGrappledBy",
                    },
                  ],
                },
              ],
              on: {
                PIN_ATTEMPT: [
                  {
                    target: "pinned",
                    guard: "pinSuccess",
                    actions: [],
                  },
                ],
                GRAPPLE_ESCAPE: [
                  {
                    target: "free",
                    guard: "grappleEscapeSuccess",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                ],
                APPLY_BOUND: [
                  {
                    target: "bound",
                    actions: [
                      {
                        type: "clearGrappledBy",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        afflictionTrack: {
          initial: "healthy",
          states: {
            healthy: {
              on: {
                APPLY_AFFLICTION: [
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.paralytic",
                    guard: "afflictionParalytic",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.weak",
                    guard: "afflictionWeak",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseFatigue",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.lethal",
                    guard: "afflictionLethal",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseLethalTick",
                      },
                    ],
                  },
                  {
                    target: "#savage.alive.afflictionTrack.afflicted.sleep",
                    guard: "afflictionSleep",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                ],
              },
            },
            afflicted: {
              initial: "paralytic",
              states: {
                paralytic: {},
                weak: {},
                lethal: {
                  always: {
                    target: "#savage.dead",
                    guard: "afflictionTimerExpired",
                    actions: [
                      {
                        type: "clearAfflictionTimer",
                      },
                    ],
                  },
                },
                sleep: {},
              },
              always: {
                target: "healthy",
                guard: "afflictionTimerExpired",
                actions: [
                  {
                    type: "clearAfflictionTimer",
                  },
                ],
              },
              on: {
                CURE_AFFLICTION: [
                  {
                    target: "healthy",
                    actions: [
                      {
                        type: "clearAfflictionTimer",
                      },
                    ],
                  },
                ],
                APPLY_AFFLICTION: [
                  {
                    target: ".paralytic",
                    guard: "afflictionParalytic",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                  {
                    target: ".weak",
                    guard: "afflictionWeak",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseFatigue",
                      },
                    ],
                  },
                  {
                    target: ".lethal",
                    guard: "afflictionLethal",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                      {
                        type: "raiseLethalTick",
                      },
                    ],
                  },
                  {
                    target: ".sleep",
                    guard: "afflictionSleep",
                    actions: [
                      {
                        type: "setAfflictionTimer",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      on: {
        APPLY_POWER_EFFECT: [
          {
            guard: "durationPositive",
            actions: [
              {
                type: "applyPowerEffect",
              },
            ],
          },
        ],
        DISMISS_EFFECT: [
          {
            actions: [
              {
                type: "dismissEffect",
              },
            ],
          },
        ],
        BACKLASH: [
          {
            actions: [
              {
                type: "backlashClearEffects",
              },
              {
                type: "raiseFatigue",
              },
            ],
          },
        ],
      },
      type: "parallel",
    },
    dead: {
      entry: {
        type: "inline:savage.dead#entry[0]",
      },
      type: "final",
    },
  },
  on: {
    SET_HARDY: [
      {
        actions: [
          {
            type: "inline:savage#SET_HARDY[-1]#transition[0]",
          },
        ],
      },
    ],
  },
}