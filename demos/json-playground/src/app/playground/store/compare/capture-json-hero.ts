export const jsonDocsContext = {
  doc: {
    id: "yhqB6HiMeeNu",
    type: "raw",
    contents:
      '{\n  "components": {\n    "responses": {\n      "Error": {\n        "content": {\n          "application/json": {\n            "schema": {\n              "$ref": "#/components/schemas/Error"\n            }\n          }\n        },\n        "description": "Error"\n      }\n    },\n    "schemas": {\n      "Error": {\n        "description": "Error information from a response.",\n        "properties": {\n          "error_code": {\n            "type": "string"\n          },\n          "message": {\n            "type": "string"\n          },\n          "request_id": {\n            "type": "string"\n          }\n        },\n        "required": [\n          "message",\n          "request_id"\n        ],\n        "type": "object"\n      },\n      "ExtraMachineInfoResponse": {\n        "description": "Extra machine-specific information regarding a connected machine.",\n        "oneOf": [\n          {\n            "properties": {\n              "type": {\n                "enum": [\n                  "moonraker"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "properties": {\n              "type": {\n                "enum": [\n                  "usb"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "properties": {\n              "current_stage": {\n                "allOf": [\n                  {\n                    "$ref": "#/components/schemas/Stage"\n                  }\n                ],\n                "description": "The current stage of the machine as defined by Bambu which can include errors, etc.",\n                "nullable": true\n              },\n              "nozzle_diameter": {\n                "allOf": [\n                  {\n                    "$ref": "#/components/schemas/NozzleDiameter"\n                  }\n                ],\n                "description": "The nozzle diameter of the machine."\n              },\n              "type": {\n                "enum": [\n                  "bambu"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "nozzle_diameter",\n              "type"\n            ],\n            "type": "object"\n          }\n        ]\n      },\n      "FdmHardwareConfiguration": {\n        "description": "Configuration for a FDM-based printer.",\n        "properties": {\n          "filaments": {\n            "description": "The filaments the printer has access to.",\n            "items": {\n              "$ref": "#/components/schemas/Filament"\n            },\n            "type": "array"\n          },\n          "loaded_filament_idx": {\n            "description": "The currently loaded filament index.",\n            "format": "uint",\n            "minimum": 0,\n            "nullable": true,\n            "type": "integer"\n          },\n          "nozzle_diameter": {\n            "description": "Diameter of the extrusion nozzle, in mm.",\n            "format": "double",\n            "type": "number"\n          }\n        },\n        "required": [\n          "filaments",\n          "nozzle_diameter"\n        ],\n        "type": "object"\n      },\n      "Filament": {\n        "description": "Information about the filament being used in a FDM printer.",\n        "properties": {\n          "color": {\n            "description": "The color (as hex without the `#`) of the filament, this is likely specific to the manufacturer.",\n            "maxLength": 6,\n            "minLength": 6,\n            "nullable": true,\n            "type": "string"\n          },\n          "material": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/FilamentMaterial"\n              }\n            ],\n            "description": "The material that the filament is made of."\n          },\n          "name": {\n            "description": "The name of the filament, this is likely specfic to the manufacturer.",\n            "nullable": true,\n            "type": "string"\n          }\n        },\n        "required": [\n          "material"\n        ],\n        "type": "object"\n      },\n      "FilamentMaterial": {\n        "description": "The material that the filament is made of.",\n        "oneOf": [\n          {\n            "description": "Polylactic acid based plastics",\n            "properties": {\n              "type": {\n                "enum": [\n                  "pla"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Pla support",\n            "properties": {\n              "type": {\n                "enum": [\n                  "pla_support"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "acrylonitrile butadiene styrene based plastics",\n            "properties": {\n              "type": {\n                "enum": [\n                  "abs"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "polyethylene terephthalate glycol based plastics",\n            "properties": {\n              "type": {\n                "enum": [\n                  "petg"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "unsuprisingly, nylon based",\n            "properties": {\n              "type": {\n                "enum": [\n                  "nylon"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "thermoplastic polyurethane based urethane material",\n            "properties": {\n              "type": {\n                "enum": [\n                  "tpu"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "polyvinyl alcohol based material",\n            "properties": {\n              "type": {\n                "enum": [\n                  "pva"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "high impact polystyrene based material",\n            "properties": {\n              "type": {\n                "enum": [\n                  "hips"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "composite material with stuff in other stuff, something like PLA mixed with carbon fiber, kevlar, or fiberglass",\n            "properties": {\n              "type": {\n                "enum": [\n                  "composite"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Unknown material",\n            "properties": {\n              "type": {\n                "enum": [\n                  "unknown"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          }\n        ]\n      },\n      "HardwareConfiguration": {\n        "description": "The hardware configuration of a machine.",\n        "oneOf": [\n          {\n            "description": "No configuration is possible. This isn\'t the same conceptually as an `Option<HardwareConfiguration>`, because this indicates we positively know there is no possible configuration changes that are possible with this method of manufcture.",\n            "properties": {\n              "type": {\n                "enum": [\n                  "none"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "type"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Hardware configuration specific to FDM based printers",\n            "properties": {\n              "config": {\n                "allOf": [\n                  {\n                    "$ref": "#/components/schemas/FdmHardwareConfiguration"\n                  }\n                ],\n                "description": "The configuration for the FDM printer."\n              },\n              "type": {\n                "enum": [\n                  "fdm"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "config",\n              "type"\n            ],\n            "type": "object"\n          }\n        ]\n      },\n      "MachineInfoResponse": {\n        "description": "Information regarding a connected machine.",\n        "properties": {\n          "extra": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/ExtraMachineInfoResponse"\n              }\n            ],\n            "description": "Additional, per-machine information which is specific to the underlying machine type.",\n            "nullable": true\n          },\n          "hardware_configuration": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/HardwareConfiguration"\n              }\n            ],\n            "description": "Information about how the Machine is currently configured."\n          },\n          "id": {\n            "description": "Machine Identifier (ID) for the specific Machine.",\n            "type": "string"\n          },\n          "machine_type": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/MachineType"\n              }\n            ],\n            "description": "Information regarding the method of manufacture."\n          },\n          "make_model": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/MachineMakeModel"\n              }\n            ],\n            "description": "Information regarding the make and model of the attached Machine."\n          },\n          "max_part_volume": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/Volume"\n              }\n            ],\n            "description": "Maximum part size that can be manufactured by this device. This may be some sort of theoretical upper bound, getting close to this limit seems like maybe a bad idea.\\n\\nThis may be `None` if the maximum size is not knowable by the Machine API.\\n\\nWhat \\"close\\" means is up to you!",\n            "nullable": true\n          },\n          "progress": {\n            "description": "Progress of the current print, if printing.",\n            "format": "double",\n            "nullable": true,\n            "type": "number"\n          },\n          "state": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/MachineState"\n              }\n            ],\n            "description": "Status of the printer -- be it printing, idle, or unreachable. This may dictate if a machine is capable of taking a new job."\n          }\n        },\n        "required": [\n          "hardware_configuration",\n          "id",\n          "machine_type",\n          "make_model",\n          "state"\n        ],\n        "type": "object"\n      },\n      "MachineMakeModel": {\n        "description": "Information regarding the make/model of a discovered endpoint.",\n        "properties": {\n          "manufacturer": {\n            "description": "The manufacturer that built the connected Machine.",\n            "nullable": true,\n            "type": "string"\n          },\n          "model": {\n            "description": "The model of the connected Machine.",\n            "nullable": true,\n            "type": "string"\n          },\n          "serial": {\n            "description": "The unique serial number of the connected Machine.",\n            "nullable": true,\n            "type": "string"\n          }\n        },\n        "type": "object"\n      },\n      "MachineState": {\n        "description": "Current state of the machine -- be it printing, idle or offline. This can be used to determine if a printer is in the correct state to take a new job.",\n        "oneOf": [\n          {\n            "description": "If a print state can not be resolved at this time, an Unknown may be returned.",\n            "properties": {\n              "state": {\n                "enum": [\n                  "unknown"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "state"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Idle, and ready for another job.",\n            "properties": {\n              "state": {\n                "enum": [\n                  "idle"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "state"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Running a job -- 3D printing or CNC-ing a part.",\n            "properties": {\n              "state": {\n                "enum": [\n                  "running"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "state"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Machine is currently offline or unreachable.",\n            "properties": {\n              "state": {\n                "enum": [\n                  "offline"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "state"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Job is underway but halted, waiting for some action to take place.",\n            "properties": {\n              "state": {\n                "enum": [\n                  "paused"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "state"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "Job is finished, but waiting manual action to move back to Idle.",\n            "properties": {\n              "state": {\n                "enum": [\n                  "complete"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "state"\n            ],\n            "type": "object"\n          },\n          {\n            "description": "The printer has failed and is in an unknown state that may require manual attention to resolve. The inner value is a human readable description of what specifically has failed.",\n            "properties": {\n              "message": {\n                "description": "A human-readable message describing the failure.",\n                "nullable": true,\n                "type": "string"\n              },\n              "state": {\n                "enum": [\n                  "failed"\n                ],\n                "type": "string"\n              }\n            },\n            "required": [\n              "state"\n            ],\n            "type": "object"\n          }\n        ]\n      },\n      "MachineType": {\n        "description": "Specific technique by which this Machine takes a design, and produces a real-world 3D object.",\n        "oneOf": [\n          {\n            "description": "Use light to cure a resin to build up layers.",\n            "enum": [\n              "stereolithography"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Fused Deposition Modeling, layers of melted plastic.",\n            "enum": [\n              "fused_deposition"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "\\"Computer numerical control\\" - machine that grinds away material from a hunk of material to construct a part.",\n            "enum": [\n              "cnc"\n            ],\n            "type": "string"\n          }\n        ]\n      },\n      "NozzleDiameter": {\n        "description": "A nozzle diameter.",\n        "oneOf": [\n          {\n            "description": "0.2mm.",\n            "enum": [\n              "0.2"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "0.4mm.",\n            "enum": [\n              "0.4"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "0.6mm.",\n            "enum": [\n              "0.6"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "0.8mm.",\n            "enum": [\n              "0.8"\n            ],\n            "type": "string"\n          }\n        ]\n      },\n      "Pong": {\n        "description": "The response from the `/ping` endpoint.",\n        "properties": {\n          "message": {\n            "description": "The pong response.",\n            "type": "string"\n          }\n        },\n        "required": [\n          "message"\n        ],\n        "type": "object"\n      },\n      "PrintJobResponse": {\n        "description": "The response from the `/print` endpoint.",\n        "properties": {\n          "job_id": {\n            "description": "The job id used for this print.",\n            "type": "string"\n          },\n          "parameters": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/PrintParameters"\n              }\n            ],\n            "description": "The parameters used for this print."\n          }\n        },\n        "required": [\n          "job_id",\n          "parameters"\n        ],\n        "type": "object"\n      },\n      "PrintParameters": {\n        "description": "Parameters for printing.",\n        "properties": {\n          "job_name": {\n            "description": "The name for the job.",\n            "type": "string"\n          },\n          "machine_id": {\n            "description": "The machine id to print to.",\n            "type": "string"\n          },\n          "slicer_configuration": {\n            "allOf": [\n              {\n                "$ref": "#/components/schemas/SlicerConfiguration"\n              }\n            ],\n            "description": "Requested design-specific slicer configurations.",\n            "nullable": true\n          }\n        },\n        "required": [\n          "job_name",\n          "machine_id"\n        ],\n        "type": "object"\n      },\n      "SlicerConfiguration": {\n        "description": "The slicer configuration is a set of parameters that are passed to the slicer to control how the gcode is generated.",\n        "properties": {\n          "filament_idx": {\n            "description": "The filament to use for the print.",\n            "format": "uint",\n            "minimum": 0,\n            "nullable": true,\n            "type": "integer"\n          }\n        },\n        "type": "object"\n      },\n      "Stage": {\n        "description": "The print stage. These come from: https://github.com/SoftFever/OrcaSlicer/blob/431978baf17961df90f0d01871b0ad1d839d7f5d/src/slic3r/GUI/DeviceManager.cpp#L78",\n        "oneOf": [\n          {\n            "description": "Nothing.",\n            "enum": [\n              "nothing"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Empty.",\n            "enum": [\n              "empty"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Auto bed leveling.",\n            "enum": [\n              "auto_bed_leveling"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Heatbed preheating.",\n            "enum": [\n              "heatbed_preheating"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Sweeping XY mech mode.",\n            "enum": [\n              "sweeping_xy_mech_mode"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Changing filament.",\n            "enum": [\n              "changing_filament"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "M400 pause.",\n            "enum": [\n              "m400_pause"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Paused due to filament runout.",\n            "enum": [\n              "paused_due_to_filament_runout"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Heating hotend.",\n            "enum": [\n              "heating_hotend"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Calibrating extrusion.",\n            "enum": [\n              "calibrating_extrusion"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Scanning bed surface.",\n            "enum": [\n              "scanning_bed_surface"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Inspecting first layer.",\n            "enum": [\n              "inspecting_first_layer"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Identifying build plate type.",\n            "enum": [\n              "identifying_build_plate_type"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Calibrating micro lidar.",\n            "enum": [\n              "calibrating_micro_lidar"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Homing toolhead.",\n            "enum": [\n              "homing_toolhead"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Cleaning nozzle tip.",\n            "enum": [\n              "cleaning_nozzle_tip"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Checking extruder temperature.",\n            "enum": [\n              "checking_extruder_temperature"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Printing was paused by the user.",\n            "enum": [\n              "printing_was_paused_by_the_user"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Pause of front cover falling.",\n            "enum": [\n              "pause_of_front_cover_falling"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Calibrating micro lidar.",\n            "enum": [\n              "calibrating_micro_lidar2"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Calibrating extrusion flow.",\n            "enum": [\n              "calibrating_extrusion_flow"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Paused due to nozzle temperature malfunction.",\n            "enum": [\n              "paused_due_to_nozzle_temperature_malfunction"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Paused due to heat bed temperature malfunction.",\n            "enum": [\n              "paused_due_to_heat_bed_temperature_malfunction"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Filament unloading.",\n            "enum": [\n              "filament_unloading"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Skip step pause.",\n            "enum": [\n              "skip_step_pause"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Filament loading.",\n            "enum": [\n              "filament_loading"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Motor noise calibration.",\n            "enum": [\n              "motor_noise_calibration"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Paused due to AMS lost.",\n            "enum": [\n              "paused_due_to_ams_lost"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Paused due to low speed of the heat break fan.",\n            "enum": [\n              "paused_due_to_low_speed_of_the_heat_break_fan"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Paused due to chamber temperature control error.",\n            "enum": [\n              "paused_due_to_chamber_temperature_control_error"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Cooling chamber.",\n            "enum": [\n              "cooling_chamber"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Paused by the Gcode inserted by the user.",\n            "enum": [\n              "paused_by_the_gcode_inserted_by_the_user"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Motor noise showoff.",\n            "enum": [\n              "motor_noise_showoff"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Nozzle filament covered detected pause.",\n            "enum": [\n              "nozzle_filament_covered_detected_pause"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Cutter error pause.",\n            "enum": [\n              "cutter_error_pause"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "First layer error pause.",\n            "enum": [\n              "first_layer_error_pause"\n            ],\n            "type": "string"\n          },\n          {\n            "description": "Nozzle clog pause.",\n            "enum": [\n              "nozzle_clog_pause"\n            ],\n            "type": "string"\n          }\n        ]\n      },\n      "Volume": {\n        "description": "Set of three values to represent the extent of a 3-D Volume. This contains the width, depth, and height values, generally used to represent some maximum or minimum.\\n\\nAll measurements are in millimeters.",\n        "properties": {\n          "depth": {\n            "description": "Depth of the volume (\\"front to back\\"), in millimeters.",\n            "format": "double",\n            "type": "number"\n          },\n          "height": {\n            "description": "Height of the volume (\\"up and down\\"), in millimeters.",\n            "format": "double",\n            "type": "number"\n          },\n          "width": {\n            "description": "Width of the volume (\\"left and right\\"), in millimeters.",\n            "format": "double",\n            "type": "number"\n          }\n        },\n        "required": [\n          "depth",\n          "height",\n          "width"\n        ],\n        "type": "object"\n      }\n    }\n  },\n  "info": {\n    "contact": {\n      "email": "machine-api@zoo.dev",\n      "url": "https://zoo.dev"\n    },\n    "description": "",\n    "title": "machine-api",\n    "version": "0.1.1"\n  },\n  "openapi": "3.0.3",\n  "paths": {\n    "/": {\n      "get": {\n        "operationId": "api_get_schema",\n        "responses": {\n          "200": {\n            "content": {\n              "application/json": {\n                "schema": {}\n              }\n            },\n            "description": "successful operation"\n          },\n          "4XX": {\n            "$ref": "#/components/responses/Error"\n          },\n          "5XX": {\n            "$ref": "#/components/responses/Error"\n          }\n        },\n        "summary": "Return the OpenAPI schema in JSON format.",\n        "tags": [\n          "meta"\n        ]\n      }\n    },\n    "/machines": {\n      "get": {\n        "operationId": "get_machines",\n        "responses": {\n          "200": {\n            "content": {\n              "application/json": {\n                "schema": {\n                  "items": {\n                    "$ref": "#/components/schemas/MachineInfoResponse"\n                  },\n                  "title": "Array_of_MachineInfoResponse",\n                  "type": "array"\n                }\n              }\n            },\n            "description": "successful operation"\n          },\n          "4XX": {\n            "$ref": "#/components/responses/Error"\n          },\n          "5XX": {\n            "$ref": "#/components/responses/Error"\n          }\n        },\n        "summary": "List available machines and their statuses",\n        "tags": [\n          "machines"\n        ]\n      }\n    },\n    "/machines/{id}": {\n      "get": {\n        "operationId": "get_machine",\n        "parameters": [\n          {\n            "description": "The machine ID.",\n            "in": "path",\n            "name": "id",\n            "required": true,\n            "schema": {\n              "type": "string"\n            }\n          }\n        ],\n        "responses": {\n          "200": {\n            "content": {\n              "application/json": {\n                "schema": {\n                  "$ref": "#/components/schemas/MachineInfoResponse"\n                }\n              }\n            },\n            "description": "successful operation"\n          },\n          "4XX": {\n            "$ref": "#/components/responses/Error"\n          },\n          "5XX": {\n            "$ref": "#/components/responses/Error"\n          }\n        },\n        "summary": "Get the status of a specific machine",\n        "tags": [\n          "machines"\n        ]\n      }\n    },\n    "/metrics": {\n      "get": {\n        "operationId": "get_metrics",\n        "responses": {\n          "200": {\n            "content": {\n              "application/json": {\n                "schema": {\n                  "title": "String",\n                  "type": "string"\n                }\n              }\n            },\n            "description": "successful operation"\n          },\n          "4XX": {\n            "$ref": "#/components/responses/Error"\n          },\n          "5XX": {\n            "$ref": "#/components/responses/Error"\n          }\n        },\n        "summary": "List available machines and their statuses",\n        "tags": [\n          "hidden"\n        ]\n      }\n    },\n    "/ping": {\n      "get": {\n        "operationId": "ping",\n        "responses": {\n          "200": {\n            "content": {\n              "application/json": {\n                "schema": {\n                  "$ref": "#/components/schemas/Pong"\n                }\n              }\n            },\n            "description": "successful operation"\n          },\n          "4XX": {\n            "$ref": "#/components/responses/Error"\n          },\n          "5XX": {\n            "$ref": "#/components/responses/Error"\n          }\n        },\n        "summary": "Return pong.",\n        "tags": [\n          "meta"\n        ]\n      }\n    },\n    "/print": {\n      "post": {\n        "operationId": "print_file",\n        "requestBody": {\n          "content": {\n            "multipart/form-data": {\n              "schema": {\n                "format": "binary",\n                "type": "string"\n              }\n            }\n          },\n          "required": true\n        },\n        "responses": {\n          "200": {\n            "content": {\n              "application/json": {\n                "schema": {\n                  "$ref": "#/components/schemas/PrintJobResponse"\n                }\n              }\n            },\n            "description": "successful operation"\n          },\n          "4XX": {\n            "$ref": "#/components/responses/Error"\n          },\n          "5XX": {\n            "$ref": "#/components/responses/Error"\n          }\n        },\n        "summary": "Print a given file. File must be a sliceable 3D model.",\n        "tags": [\n          "machines"\n        ]\n      }\n    }\n  },\n  "tags": [\n    {\n      "description": "Hidden API endpoints that should not show up in the docs.",\n      "externalDocs": {\n        "url": "https://docs.zoo.dev/api/machines"\n      },\n      "name": "hidden"\n    },\n    {\n      "description": "Utilities for making parts and discovering machines.",\n      "externalDocs": {\n        "url": "https://docs.zoo.dev/api/machines"\n      },\n      "name": "machines"\n    },\n    {\n      "description": "Meta information about the API.",\n      "externalDocs": {\n        "url": "https://docs.zoo.dev/api/meta"\n      },\n      "name": "meta"\n    }\n  ]\n}',
    title: "xstate-open-api.json",
    readOnly: false,
  },
  path: null,
}

export const jsonSchema = {
  json: {
    components: {
      responses: {
        Error: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
          description: "Error",
        },
      },
      schemas: {
        Error: {
          description: "Error information from a response.",
          properties: {
            error_code: {
              type: "string",
            },
            message: {
              type: "string",
            },
            request_id: {
              type: "string",
            },
          },
          required: ["message", "request_id"],
          type: "object",
        },
        ExtraMachineInfoResponse: {
          description: "Extra machine-specific information regarding a connected machine.",
          oneOf: [
            {
              properties: {
                type: {
                  enum: ["moonraker"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                type: {
                  enum: ["usb"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                current_stage: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/Stage",
                    },
                  ],
                  description: "The current stage of the machine as defined by Bambu which can include errors, etc.",
                  nullable: true,
                },
                nozzle_diameter: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/NozzleDiameter",
                    },
                  ],
                  description: "The nozzle diameter of the machine.",
                },
                type: {
                  enum: ["bambu"],
                  type: "string",
                },
              },
              required: ["nozzle_diameter", "type"],
              type: "object",
            },
          ],
        },
        FdmHardwareConfiguration: {
          description: "Configuration for a FDM-based printer.",
          properties: {
            filaments: {
              description: "The filaments the printer has access to.",
              items: {
                $ref: "#/components/schemas/Filament",
              },
              type: "array",
            },
            loaded_filament_idx: {
              description: "The currently loaded filament index.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
            nozzle_diameter: {
              description: "Diameter of the extrusion nozzle, in mm.",
              format: "double",
              type: "number",
            },
          },
          required: ["filaments", "nozzle_diameter"],
          type: "object",
        },
        Filament: {
          description: "Information about the filament being used in a FDM printer.",
          properties: {
            color: {
              description:
                "The color (as hex without the `#`) of the filament, this is likely specific to the manufacturer.",
              maxLength: 6,
              minLength: 6,
              nullable: true,
              type: "string",
            },
            material: {
              allOf: [
                {
                  $ref: "#/components/schemas/FilamentMaterial",
                },
              ],
              description: "The material that the filament is made of.",
            },
            name: {
              description: "The name of the filament, this is likely specfic to the manufacturer.",
              nullable: true,
              type: "string",
            },
          },
          required: ["material"],
          type: "object",
        },
        FilamentMaterial: {
          description: "The material that the filament is made of.",
          oneOf: [
            {
              description: "Polylactic acid based plastics",
              properties: {
                type: {
                  enum: ["pla"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Pla support",
              properties: {
                type: {
                  enum: ["pla_support"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "acrylonitrile butadiene styrene based plastics",
              properties: {
                type: {
                  enum: ["abs"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyethylene terephthalate glycol based plastics",
              properties: {
                type: {
                  enum: ["petg"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "unsuprisingly, nylon based",
              properties: {
                type: {
                  enum: ["nylon"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "thermoplastic polyurethane based urethane material",
              properties: {
                type: {
                  enum: ["tpu"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyvinyl alcohol based material",
              properties: {
                type: {
                  enum: ["pva"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "high impact polystyrene based material",
              properties: {
                type: {
                  enum: ["hips"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description:
                "composite material with stuff in other stuff, something like PLA mixed with carbon fiber, kevlar, or fiberglass",
              properties: {
                type: {
                  enum: ["composite"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Unknown material",
              properties: {
                type: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
          ],
        },
        HardwareConfiguration: {
          description: "The hardware configuration of a machine.",
          oneOf: [
            {
              description:
                "No configuration is possible. This isn't the same conceptually as an `Option<HardwareConfiguration>`, because this indicates we positively know there is no possible configuration changes that are possible with this method of manufcture.",
              properties: {
                type: {
                  enum: ["none"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Hardware configuration specific to FDM based printers",
              properties: {
                config: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/FdmHardwareConfiguration",
                    },
                  ],
                  description: "The configuration for the FDM printer.",
                },
                type: {
                  enum: ["fdm"],
                  type: "string",
                },
              },
              required: ["config", "type"],
              type: "object",
            },
          ],
        },
        MachineInfoResponse: {
          description: "Information regarding a connected machine.",
          properties: {
            extra: {
              allOf: [
                {
                  $ref: "#/components/schemas/ExtraMachineInfoResponse",
                },
              ],
              description: "Additional, per-machine information which is specific to the underlying machine type.",
              nullable: true,
            },
            hardware_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/HardwareConfiguration",
                },
              ],
              description: "Information about how the Machine is currently configured.",
            },
            id: {
              description: "Machine Identifier (ID) for the specific Machine.",
              type: "string",
            },
            machine_type: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineType",
                },
              ],
              description: "Information regarding the method of manufacture.",
            },
            make_model: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineMakeModel",
                },
              ],
              description: "Information regarding the make and model of the attached Machine.",
            },
            max_part_volume: {
              allOf: [
                {
                  $ref: "#/components/schemas/Volume",
                },
              ],
              description:
                'Maximum part size that can be manufactured by this device. This may be some sort of theoretical upper bound, getting close to this limit seems like maybe a bad idea.\n\nThis may be `None` if the maximum size is not knowable by the Machine API.\n\nWhat "close" means is up to you!',
              nullable: true,
            },
            progress: {
              description: "Progress of the current print, if printing.",
              format: "double",
              nullable: true,
              type: "number",
            },
            state: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineState",
                },
              ],
              description:
                "Status of the printer -- be it printing, idle, or unreachable. This may dictate if a machine is capable of taking a new job.",
            },
          },
          required: ["hardware_configuration", "id", "machine_type", "make_model", "state"],
          type: "object",
        },
        MachineMakeModel: {
          description: "Information regarding the make/model of a discovered endpoint.",
          properties: {
            manufacturer: {
              description: "The manufacturer that built the connected Machine.",
              nullable: true,
              type: "string",
            },
            model: {
              description: "The model of the connected Machine.",
              nullable: true,
              type: "string",
            },
            serial: {
              description: "The unique serial number of the connected Machine.",
              nullable: true,
              type: "string",
            },
          },
          type: "object",
        },
        MachineState: {
          description:
            "Current state of the machine -- be it printing, idle or offline. This can be used to determine if a printer is in the correct state to take a new job.",
          oneOf: [
            {
              description: "If a print state can not be resolved at this time, an Unknown may be returned.",
              properties: {
                state: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Idle, and ready for another job.",
              properties: {
                state: {
                  enum: ["idle"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Running a job -- 3D printing or CNC-ing a part.",
              properties: {
                state: {
                  enum: ["running"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Machine is currently offline or unreachable.",
              properties: {
                state: {
                  enum: ["offline"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is underway but halted, waiting for some action to take place.",
              properties: {
                state: {
                  enum: ["paused"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is finished, but waiting manual action to move back to Idle.",
              properties: {
                state: {
                  enum: ["complete"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description:
                "The printer has failed and is in an unknown state that may require manual attention to resolve. The inner value is a human readable description of what specifically has failed.",
              properties: {
                message: {
                  description: "A human-readable message describing the failure.",
                  nullable: true,
                  type: "string",
                },
                state: {
                  enum: ["failed"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
          ],
        },
        MachineType: {
          description: "Specific technique by which this Machine takes a design, and produces a real-world 3D object.",
          oneOf: [
            {
              description: "Use light to cure a resin to build up layers.",
              enum: ["stereolithography"],
              type: "string",
            },
            {
              description: "Fused Deposition Modeling, layers of melted plastic.",
              enum: ["fused_deposition"],
              type: "string",
            },
            {
              description:
                '"Computer numerical control" - machine that grinds away material from a hunk of material to construct a part.',
              enum: ["cnc"],
              type: "string",
            },
          ],
        },
        NozzleDiameter: {
          description: "A nozzle diameter.",
          oneOf: [
            {
              description: "0.2mm.",
              enum: ["0.2"],
              type: "string",
            },
            {
              description: "0.4mm.",
              enum: ["0.4"],
              type: "string",
            },
            {
              description: "0.6mm.",
              enum: ["0.6"],
              type: "string",
            },
            {
              description: "0.8mm.",
              enum: ["0.8"],
              type: "string",
            },
          ],
        },
        Pong: {
          description: "The response from the `/ping` endpoint.",
          properties: {
            message: {
              description: "The pong response.",
              type: "string",
            },
          },
          required: ["message"],
          type: "object",
        },
        PrintJobResponse: {
          description: "The response from the `/print` endpoint.",
          properties: {
            job_id: {
              description: "The job id used for this print.",
              type: "string",
            },
            parameters: {
              allOf: [
                {
                  $ref: "#/components/schemas/PrintParameters",
                },
              ],
              description: "The parameters used for this print.",
            },
          },
          required: ["job_id", "parameters"],
          type: "object",
        },
        PrintParameters: {
          description: "Parameters for printing.",
          properties: {
            job_name: {
              description: "The name for the job.",
              type: "string",
            },
            machine_id: {
              description: "The machine id to print to.",
              type: "string",
            },
            slicer_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/SlicerConfiguration",
                },
              ],
              description: "Requested design-specific slicer configurations.",
              nullable: true,
            },
          },
          required: ["job_name", "machine_id"],
          type: "object",
        },
        SlicerConfiguration: {
          description:
            "The slicer configuration is a set of parameters that are passed to the slicer to control how the gcode is generated.",
          properties: {
            filament_idx: {
              description: "The filament to use for the print.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
          },
          type: "object",
        },
        Stage: {
          description:
            "The print stage. These come from: https://github.com/SoftFever/OrcaSlicer/blob/431978baf17961df90f0d01871b0ad1d839d7f5d/src/slic3r/GUI/DeviceManager.cpp#L78",
          oneOf: [
            {
              description: "Nothing.",
              enum: ["nothing"],
              type: "string",
            },
            {
              description: "Empty.",
              enum: ["empty"],
              type: "string",
            },
            {
              description: "Auto bed leveling.",
              enum: ["auto_bed_leveling"],
              type: "string",
            },
            {
              description: "Heatbed preheating.",
              enum: ["heatbed_preheating"],
              type: "string",
            },
            {
              description: "Sweeping XY mech mode.",
              enum: ["sweeping_xy_mech_mode"],
              type: "string",
            },
            {
              description: "Changing filament.",
              enum: ["changing_filament"],
              type: "string",
            },
            {
              description: "M400 pause.",
              enum: ["m400_pause"],
              type: "string",
            },
            {
              description: "Paused due to filament runout.",
              enum: ["paused_due_to_filament_runout"],
              type: "string",
            },
            {
              description: "Heating hotend.",
              enum: ["heating_hotend"],
              type: "string",
            },
            {
              description: "Calibrating extrusion.",
              enum: ["calibrating_extrusion"],
              type: "string",
            },
            {
              description: "Scanning bed surface.",
              enum: ["scanning_bed_surface"],
              type: "string",
            },
            {
              description: "Inspecting first layer.",
              enum: ["inspecting_first_layer"],
              type: "string",
            },
            {
              description: "Identifying build plate type.",
              enum: ["identifying_build_plate_type"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar"],
              type: "string",
            },
            {
              description: "Homing toolhead.",
              enum: ["homing_toolhead"],
              type: "string",
            },
            {
              description: "Cleaning nozzle tip.",
              enum: ["cleaning_nozzle_tip"],
              type: "string",
            },
            {
              description: "Checking extruder temperature.",
              enum: ["checking_extruder_temperature"],
              type: "string",
            },
            {
              description: "Printing was paused by the user.",
              enum: ["printing_was_paused_by_the_user"],
              type: "string",
            },
            {
              description: "Pause of front cover falling.",
              enum: ["pause_of_front_cover_falling"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar2"],
              type: "string",
            },
            {
              description: "Calibrating extrusion flow.",
              enum: ["calibrating_extrusion_flow"],
              type: "string",
            },
            {
              description: "Paused due to nozzle temperature malfunction.",
              enum: ["paused_due_to_nozzle_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Paused due to heat bed temperature malfunction.",
              enum: ["paused_due_to_heat_bed_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Filament unloading.",
              enum: ["filament_unloading"],
              type: "string",
            },
            {
              description: "Skip step pause.",
              enum: ["skip_step_pause"],
              type: "string",
            },
            {
              description: "Filament loading.",
              enum: ["filament_loading"],
              type: "string",
            },
            {
              description: "Motor noise calibration.",
              enum: ["motor_noise_calibration"],
              type: "string",
            },
            {
              description: "Paused due to AMS lost.",
              enum: ["paused_due_to_ams_lost"],
              type: "string",
            },
            {
              description: "Paused due to low speed of the heat break fan.",
              enum: ["paused_due_to_low_speed_of_the_heat_break_fan"],
              type: "string",
            },
            {
              description: "Paused due to chamber temperature control error.",
              enum: ["paused_due_to_chamber_temperature_control_error"],
              type: "string",
            },
            {
              description: "Cooling chamber.",
              enum: ["cooling_chamber"],
              type: "string",
            },
            {
              description: "Paused by the Gcode inserted by the user.",
              enum: ["paused_by_the_gcode_inserted_by_the_user"],
              type: "string",
            },
            {
              description: "Motor noise showoff.",
              enum: ["motor_noise_showoff"],
              type: "string",
            },
            {
              description: "Nozzle filament covered detected pause.",
              enum: ["nozzle_filament_covered_detected_pause"],
              type: "string",
            },
            {
              description: "Cutter error pause.",
              enum: ["cutter_error_pause"],
              type: "string",
            },
            {
              description: "First layer error pause.",
              enum: ["first_layer_error_pause"],
              type: "string",
            },
            {
              description: "Nozzle clog pause.",
              enum: ["nozzle_clog_pause"],
              type: "string",
            },
          ],
        },
        Volume: {
          description:
            "Set of three values to represent the extent of a 3-D Volume. This contains the width, depth, and height values, generally used to represent some maximum or minimum.\n\nAll measurements are in millimeters.",
          properties: {
            depth: {
              description: 'Depth of the volume ("front to back"), in millimeters.',
              format: "double",
              type: "number",
            },
            height: {
              description: 'Height of the volume ("up and down"), in millimeters.',
              format: "double",
              type: "number",
            },
            width: {
              description: 'Width of the volume ("left and right"), in millimeters.',
              format: "double",
              type: "number",
            },
          },
          required: ["depth", "height", "width"],
          type: "object",
        },
      },
    },
    info: {
      contact: {
        email: "machine-api@zoo.dev",
        url: "https://zoo.dev",
      },
      description: "",
      title: "machine-api",
      version: "0.1.1",
    },
    openapi: "3.0.3",
    paths: {
      "/": {
        get: {
          operationId: "api_get_schema",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {},
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return the OpenAPI schema in JSON format.",
          tags: ["meta"],
        },
      },
      "/machines": {
        get: {
          operationId: "get_machines",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    items: {
                      $ref: "#/components/schemas/MachineInfoResponse",
                    },
                    title: "Array_of_MachineInfoResponse",
                    type: "array",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["machines"],
        },
      },
      "/machines/{id}": {
        get: {
          operationId: "get_machine",
          parameters: [
            {
              description: "The machine ID.",
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/MachineInfoResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Get the status of a specific machine",
          tags: ["machines"],
        },
      },
      "/metrics": {
        get: {
          operationId: "get_metrics",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    title: "String",
                    type: "string",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["hidden"],
        },
      },
      "/ping": {
        get: {
          operationId: "ping",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Pong",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return pong.",
          tags: ["meta"],
        },
      },
      "/print": {
        post: {
          operationId: "print_file",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  format: "binary",
                  type: "string",
                },
              },
            },
            required: true,
          },
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PrintJobResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Print a given file. File must be a sliceable 3D model.",
          tags: ["machines"],
        },
      },
    },
    tags: [
      {
        description: "Hidden API endpoints that should not show up in the docs.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "hidden",
      },
      {
        description: "Utilities for making parts and discovering machines.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "machines",
      },
      {
        description: "Meta information about the API.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/meta",
        },
        name: "meta",
      },
    ],
  },
  inferedJson: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    type: "object",
    properties: {
      components: {
        type: "object",
        properties: {
          responses: {
            type: "object",
            properties: {
              Error: {
                type: "object",
                properties: {
                  content: {
                    type: "object",
                    properties: {
                      "application/json": {
                        type: "object",
                        properties: {
                          schema: {
                            type: "object",
                            properties: {
                              $ref: {
                                type: "string",
                              },
                            },
                            required: ["$ref"],
                          },
                        },
                        required: ["schema"],
                      },
                    },
                    required: ["application/json"],
                  },
                  description: {
                    type: "string",
                  },
                },
                required: ["content", "description"],
              },
            },
            required: ["Error"],
          },
          schemas: {
            type: "object",
            properties: {
              Error: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      error_code: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                        },
                        required: ["type"],
                      },
                      message: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                        },
                        required: ["type"],
                      },
                      request_id: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                        },
                        required: ["type"],
                      },
                    },
                    required: ["error_code", "message", "request_id"],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
              ExtraMachineInfoResponse: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  oneOf: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          type: "object",
                          properties: {
                            type: {
                              type: "object",
                              properties: {
                                enum: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                type: {
                                  type: "string",
                                },
                              },
                              required: ["enum", "type"],
                            },
                            current_stage: {
                              type: "object",
                              properties: {
                                allOf: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      $ref: {
                                        type: "string",
                                      },
                                    },
                                    required: ["$ref"],
                                  },
                                },
                                description: {
                                  type: "string",
                                },
                                nullable: {
                                  type: "boolean",
                                },
                              },
                              required: ["allOf", "description", "nullable"],
                            },
                            nozzle_diameter: {
                              type: "object",
                              properties: {
                                allOf: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      $ref: {
                                        type: "string",
                                      },
                                    },
                                    required: ["$ref"],
                                  },
                                },
                                description: {
                                  type: "string",
                                },
                              },
                              required: ["allOf", "description"],
                            },
                          },
                          required: ["type"],
                        },
                        required: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      required: ["properties", "required", "type"],
                    },
                  },
                },
                required: ["description", "oneOf"],
              },
              FdmHardwareConfiguration: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      filaments: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          items: {
                            type: "object",
                            properties: {
                              $ref: {
                                type: "string",
                              },
                            },
                            required: ["$ref"],
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "items", "type"],
                      },
                      loaded_filament_idx: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          format: {
                            type: "string",
                          },
                          minimum: {
                            type: "integer",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "format", "minimum", "nullable", "type"],
                      },
                      nozzle_diameter: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          format: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "format", "type"],
                      },
                    },
                    required: ["filaments", "loaded_filament_idx", "nozzle_diameter"],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
              Filament: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      color: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          maxLength: {
                            type: "integer",
                          },
                          minLength: {
                            type: "integer",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "maxLength", "minLength", "nullable", "type"],
                      },
                      material: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["allOf", "description"],
                      },
                      name: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "nullable", "type"],
                      },
                    },
                    required: ["color", "material", "name"],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
              FilamentMaterial: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  oneOf: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: {
                          type: "string",
                        },
                        properties: {
                          type: "object",
                          properties: {
                            type: {
                              type: "object",
                              properties: {
                                enum: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                type: {
                                  type: "string",
                                },
                              },
                              required: ["enum", "type"],
                            },
                          },
                          required: ["type"],
                        },
                        required: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      required: ["description", "properties", "required", "type"],
                    },
                  },
                },
                required: ["description", "oneOf"],
              },
              HardwareConfiguration: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  oneOf: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: {
                          type: "string",
                        },
                        properties: {
                          type: "object",
                          properties: {
                            type: {
                              type: "object",
                              properties: {
                                enum: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                type: {
                                  type: "string",
                                },
                              },
                              required: ["enum", "type"],
                            },
                            config: {
                              type: "object",
                              properties: {
                                allOf: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      $ref: {
                                        type: "string",
                                      },
                                    },
                                    required: ["$ref"],
                                  },
                                },
                                description: {
                                  type: "string",
                                },
                              },
                              required: ["allOf", "description"],
                            },
                          },
                          required: ["type"],
                        },
                        required: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      required: ["description", "properties", "required", "type"],
                    },
                  },
                },
                required: ["description", "oneOf"],
              },
              MachineInfoResponse: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      extra: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                        },
                        required: ["allOf", "description", "nullable"],
                      },
                      hardware_configuration: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["allOf", "description"],
                      },
                      id: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "type"],
                      },
                      machine_type: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["allOf", "description"],
                      },
                      make_model: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["allOf", "description"],
                      },
                      max_part_volume: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                        },
                        required: ["allOf", "description", "nullable"],
                      },
                      progress: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          format: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "format", "nullable", "type"],
                      },
                      state: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["allOf", "description"],
                      },
                    },
                    required: [
                      "extra",
                      "hardware_configuration",
                      "id",
                      "machine_type",
                      "make_model",
                      "max_part_volume",
                      "progress",
                      "state",
                    ],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
              MachineMakeModel: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      manufacturer: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "nullable", "type"],
                      },
                      model: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "nullable", "type"],
                      },
                      serial: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "nullable", "type"],
                      },
                    },
                    required: ["manufacturer", "model", "serial"],
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "type"],
              },
              MachineState: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  oneOf: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: {
                          type: "string",
                        },
                        properties: {
                          type: "object",
                          properties: {
                            state: {
                              type: "object",
                              properties: {
                                enum: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                type: {
                                  type: "string",
                                },
                              },
                              required: ["enum", "type"],
                            },
                            message: {
                              type: "object",
                              properties: {
                                description: {
                                  type: "string",
                                },
                                nullable: {
                                  type: "boolean",
                                },
                                type: {
                                  type: "string",
                                },
                              },
                              required: ["description", "nullable", "type"],
                            },
                          },
                          required: ["state"],
                        },
                        required: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      required: ["description", "properties", "required", "type"],
                    },
                  },
                },
                required: ["description", "oneOf"],
              },
              MachineType: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  oneOf: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: {
                          type: "string",
                        },
                        enum: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      required: ["description", "enum", "type"],
                    },
                  },
                },
                required: ["description", "oneOf"],
              },
              NozzleDiameter: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  oneOf: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: {
                          type: "string",
                        },
                        enum: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      required: ["description", "enum", "type"],
                    },
                  },
                },
                required: ["description", "oneOf"],
              },
              Pong: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      message: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "type"],
                      },
                    },
                    required: ["message"],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
              PrintJobResponse: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      job_id: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "type"],
                      },
                      parameters: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["allOf", "description"],
                      },
                    },
                    required: ["job_id", "parameters"],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
              PrintParameters: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      job_name: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "type"],
                      },
                      machine_id: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "type"],
                      },
                      slicer_configuration: {
                        type: "object",
                        properties: {
                          allOf: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                $ref: {
                                  type: "string",
                                },
                              },
                              required: ["$ref"],
                            },
                          },
                          description: {
                            type: "string",
                          },
                          nullable: {
                            type: "boolean",
                          },
                        },
                        required: ["allOf", "description", "nullable"],
                      },
                    },
                    required: ["job_name", "machine_id", "slicer_configuration"],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
              SlicerConfiguration: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      filament_idx: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          format: {
                            type: "string",
                          },
                          minimum: {
                            type: "integer",
                          },
                          nullable: {
                            type: "boolean",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "format", "minimum", "nullable", "type"],
                      },
                    },
                    required: ["filament_idx"],
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "type"],
              },
              Stage: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  oneOf: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: {
                          type: "string",
                        },
                        enum: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      required: ["description", "enum", "type"],
                    },
                  },
                },
                required: ["description", "oneOf"],
              },
              Volume: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      depth: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          format: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "format", "type"],
                      },
                      height: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          format: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "format", "type"],
                      },
                      width: {
                        type: "object",
                        properties: {
                          description: {
                            type: "string",
                          },
                          format: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: ["description", "format", "type"],
                      },
                    },
                    required: ["depth", "height", "width"],
                  },
                  required: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                required: ["description", "properties", "required", "type"],
              },
            },
            required: [
              "Error",
              "ExtraMachineInfoResponse",
              "FdmHardwareConfiguration",
              "Filament",
              "FilamentMaterial",
              "HardwareConfiguration",
              "MachineInfoResponse",
              "MachineMakeModel",
              "MachineState",
              "MachineType",
              "NozzleDiameter",
              "Pong",
              "PrintJobResponse",
              "PrintParameters",
              "SlicerConfiguration",
              "Stage",
              "Volume",
            ],
          },
        },
        required: ["responses", "schemas"],
      },
      info: {
        type: "object",
        properties: {
          contact: {
            type: "object",
            properties: {
              email: {
                type: "string",
                format: "email",
              },
              url: {
                type: "string",
                format: "uri",
              },
            },
            required: ["email", "url"],
          },
          description: {
            type: "string",
          },
          title: {
            type: "string",
          },
          version: {
            type: "string",
          },
        },
        required: ["contact", "description", "title", "version"],
      },
      openapi: {
        type: "string",
      },
      paths: {
        type: "object",
        properties: {
          "/": {
            type: "object",
            properties: {
              get: {
                type: "object",
                properties: {
                  operationId: {
                    type: "string",
                  },
                  responses: {
                    type: "object",
                    properties: {
                      "200": {
                        type: "object",
                        properties: {
                          content: {
                            type: "object",
                            properties: {
                              "application/json": {
                                type: "object",
                                properties: {
                                  schema: {
                                    type: "object",
                                  },
                                },
                                required: ["schema"],
                              },
                            },
                            required: ["application/json"],
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["content", "description"],
                      },
                      "4XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                      "5XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                    },
                    required: ["200", "4XX", "5XX"],
                  },
                  summary: {
                    type: "string",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["operationId", "responses", "summary", "tags"],
              },
            },
            required: ["get"],
          },
          "/machines": {
            type: "object",
            properties: {
              get: {
                type: "object",
                properties: {
                  operationId: {
                    type: "string",
                  },
                  responses: {
                    type: "object",
                    properties: {
                      "200": {
                        type: "object",
                        properties: {
                          content: {
                            type: "object",
                            properties: {
                              "application/json": {
                                type: "object",
                                properties: {
                                  schema: {
                                    type: "object",
                                    properties: {
                                      items: {
                                        type: "object",
                                        properties: {
                                          $ref: {
                                            type: "string",
                                          },
                                        },
                                        required: ["$ref"],
                                      },
                                      title: {
                                        type: "string",
                                      },
                                      type: {
                                        type: "string",
                                      },
                                    },
                                    required: ["items", "title", "type"],
                                  },
                                },
                                required: ["schema"],
                              },
                            },
                            required: ["application/json"],
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["content", "description"],
                      },
                      "4XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                      "5XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                    },
                    required: ["200", "4XX", "5XX"],
                  },
                  summary: {
                    type: "string",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["operationId", "responses", "summary", "tags"],
              },
            },
            required: ["get"],
          },
          "/machines/{id}": {
            type: "object",
            properties: {
              get: {
                type: "object",
                properties: {
                  operationId: {
                    type: "string",
                  },
                  parameters: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: {
                          type: "string",
                        },
                        in: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        required: {
                          type: "boolean",
                        },
                        schema: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                          },
                          required: ["type"],
                        },
                      },
                      required: ["description", "in", "name", "required", "schema"],
                    },
                  },
                  responses: {
                    type: "object",
                    properties: {
                      "200": {
                        type: "object",
                        properties: {
                          content: {
                            type: "object",
                            properties: {
                              "application/json": {
                                type: "object",
                                properties: {
                                  schema: {
                                    type: "object",
                                    properties: {
                                      $ref: {
                                        type: "string",
                                      },
                                    },
                                    required: ["$ref"],
                                  },
                                },
                                required: ["schema"],
                              },
                            },
                            required: ["application/json"],
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["content", "description"],
                      },
                      "4XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                      "5XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                    },
                    required: ["200", "4XX", "5XX"],
                  },
                  summary: {
                    type: "string",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["operationId", "parameters", "responses", "summary", "tags"],
              },
            },
            required: ["get"],
          },
          "/metrics": {
            type: "object",
            properties: {
              get: {
                type: "object",
                properties: {
                  operationId: {
                    type: "string",
                  },
                  responses: {
                    type: "object",
                    properties: {
                      "200": {
                        type: "object",
                        properties: {
                          content: {
                            type: "object",
                            properties: {
                              "application/json": {
                                type: "object",
                                properties: {
                                  schema: {
                                    type: "object",
                                    properties: {
                                      title: {
                                        type: "string",
                                      },
                                      type: {
                                        type: "string",
                                      },
                                    },
                                    required: ["title", "type"],
                                  },
                                },
                                required: ["schema"],
                              },
                            },
                            required: ["application/json"],
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["content", "description"],
                      },
                      "4XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                      "5XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                    },
                    required: ["200", "4XX", "5XX"],
                  },
                  summary: {
                    type: "string",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["operationId", "responses", "summary", "tags"],
              },
            },
            required: ["get"],
          },
          "/ping": {
            type: "object",
            properties: {
              get: {
                type: "object",
                properties: {
                  operationId: {
                    type: "string",
                  },
                  responses: {
                    type: "object",
                    properties: {
                      "200": {
                        type: "object",
                        properties: {
                          content: {
                            type: "object",
                            properties: {
                              "application/json": {
                                type: "object",
                                properties: {
                                  schema: {
                                    type: "object",
                                    properties: {
                                      $ref: {
                                        type: "string",
                                      },
                                    },
                                    required: ["$ref"],
                                  },
                                },
                                required: ["schema"],
                              },
                            },
                            required: ["application/json"],
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["content", "description"],
                      },
                      "4XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                      "5XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                    },
                    required: ["200", "4XX", "5XX"],
                  },
                  summary: {
                    type: "string",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["operationId", "responses", "summary", "tags"],
              },
            },
            required: ["get"],
          },
          "/print": {
            type: "object",
            properties: {
              post: {
                type: "object",
                properties: {
                  operationId: {
                    type: "string",
                  },
                  requestBody: {
                    type: "object",
                    properties: {
                      content: {
                        type: "object",
                        properties: {
                          "multipart/form-data": {
                            type: "object",
                            properties: {
                              schema: {
                                type: "object",
                                properties: {
                                  format: {
                                    type: "string",
                                  },
                                  type: {
                                    type: "string",
                                  },
                                },
                                required: ["format", "type"],
                              },
                            },
                            required: ["schema"],
                          },
                        },
                        required: ["multipart/form-data"],
                      },
                      required: {
                        type: "boolean",
                      },
                    },
                    required: ["content", "required"],
                  },
                  responses: {
                    type: "object",
                    properties: {
                      "200": {
                        type: "object",
                        properties: {
                          content: {
                            type: "object",
                            properties: {
                              "application/json": {
                                type: "object",
                                properties: {
                                  schema: {
                                    type: "object",
                                    properties: {
                                      $ref: {
                                        type: "string",
                                      },
                                    },
                                    required: ["$ref"],
                                  },
                                },
                                required: ["schema"],
                              },
                            },
                            required: ["application/json"],
                          },
                          description: {
                            type: "string",
                          },
                        },
                        required: ["content", "description"],
                      },
                      "4XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                      "5XX": {
                        type: "object",
                        properties: {
                          $ref: {
                            type: "string",
                          },
                        },
                        required: ["$ref"],
                      },
                    },
                    required: ["200", "4XX", "5XX"],
                  },
                  summary: {
                    type: "string",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["operationId", "requestBody", "responses", "summary", "tags"],
              },
            },
            required: ["post"],
          },
        },
        required: ["/", "/machines", "/machines/{id}", "/metrics", "/ping", "/print"],
      },
      tags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            description: {
              type: "string",
            },
            externalDocs: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  format: "uri",
                },
              },
              required: ["url"],
            },
            name: {
              type: "string",
            },
          },
          required: ["description", "externalDocs", "name"],
        },
      },
    },
    required: ["components", "info", "openapi", "paths", "tags"],
  },
}

export const stableJson = {
  components: {
    responses: {
      Error: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
        description: "Error",
      },
    },
    schemas: {
      Error: {
        description: "Error information from a response.",
        properties: {
          error_code: {
            type: "string",
          },
          message: {
            type: "string",
          },
          request_id: {
            type: "string",
          },
        },
        required: ["message", "request_id"],
        type: "object",
      },
      ExtraMachineInfoResponse: {
        description: "Extra machine-specific information regarding a connected machine.",
        oneOf: [
          {
            properties: {
              type: {
                enum: ["moonraker"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            properties: {
              type: {
                enum: ["usb"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            properties: {
              current_stage: {
                allOf: [
                  {
                    $ref: "#/components/schemas/Stage",
                  },
                ],
                description: "The current stage of the machine as defined by Bambu which can include errors, etc.",
                nullable: true,
              },
              nozzle_diameter: {
                allOf: [
                  {
                    $ref: "#/components/schemas/NozzleDiameter",
                  },
                ],
                description: "The nozzle diameter of the machine.",
              },
              type: {
                enum: ["bambu"],
                type: "string",
              },
            },
            required: ["nozzle_diameter", "type"],
            type: "object",
          },
        ],
      },
      FdmHardwareConfiguration: {
        description: "Configuration for a FDM-based printer.",
        properties: {
          filaments: {
            description: "The filaments the printer has access to.",
            items: {
              $ref: "#/components/schemas/Filament",
            },
            type: "array",
          },
          loaded_filament_idx: {
            description: "The currently loaded filament index.",
            format: "uint",
            minimum: 0,
            nullable: true,
            type: "integer",
          },
          nozzle_diameter: {
            description: "Diameter of the extrusion nozzle, in mm.",
            format: "double",
            type: "number",
          },
        },
        required: ["filaments", "nozzle_diameter"],
        type: "object",
      },
      Filament: {
        description: "Information about the filament being used in a FDM printer.",
        properties: {
          color: {
            description:
              "The color (as hex without the `#`) of the filament, this is likely specific to the manufacturer.",
            maxLength: 6,
            minLength: 6,
            nullable: true,
            type: "string",
          },
          material: {
            allOf: [
              {
                $ref: "#/components/schemas/FilamentMaterial",
              },
            ],
            description: "The material that the filament is made of.",
          },
          name: {
            description: "The name of the filament, this is likely specfic to the manufacturer.",
            nullable: true,
            type: "string",
          },
        },
        required: ["material"],
        type: "object",
      },
      FilamentMaterial: {
        description: "The material that the filament is made of.",
        oneOf: [
          {
            description: "Polylactic acid based plastics",
            properties: {
              type: {
                enum: ["pla"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "Pla support",
            properties: {
              type: {
                enum: ["pla_support"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "acrylonitrile butadiene styrene based plastics",
            properties: {
              type: {
                enum: ["abs"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "polyethylene terephthalate glycol based plastics",
            properties: {
              type: {
                enum: ["petg"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "unsuprisingly, nylon based",
            properties: {
              type: {
                enum: ["nylon"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "thermoplastic polyurethane based urethane material",
            properties: {
              type: {
                enum: ["tpu"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "polyvinyl alcohol based material",
            properties: {
              type: {
                enum: ["pva"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "high impact polystyrene based material",
            properties: {
              type: {
                enum: ["hips"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description:
              "composite material with stuff in other stuff, something like PLA mixed with carbon fiber, kevlar, or fiberglass",
            properties: {
              type: {
                enum: ["composite"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "Unknown material",
            properties: {
              type: {
                enum: ["unknown"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
        ],
      },
      HardwareConfiguration: {
        description: "The hardware configuration of a machine.",
        oneOf: [
          {
            description:
              "No configuration is possible. This isn't the same conceptually as an `Option<HardwareConfiguration>`, because this indicates we positively know there is no possible configuration changes that are possible with this method of manufcture.",
            properties: {
              type: {
                enum: ["none"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
          {
            description: "Hardware configuration specific to FDM based printers",
            properties: {
              config: {
                allOf: [
                  {
                    $ref: "#/components/schemas/FdmHardwareConfiguration",
                  },
                ],
                description: "The configuration for the FDM printer.",
              },
              type: {
                enum: ["fdm"],
                type: "string",
              },
            },
            required: ["config", "type"],
            type: "object",
          },
        ],
      },
      MachineInfoResponse: {
        description: "Information regarding a connected machine.",
        properties: {
          extra: {
            allOf: [
              {
                $ref: "#/components/schemas/ExtraMachineInfoResponse",
              },
            ],
            description: "Additional, per-machine information which is specific to the underlying machine type.",
            nullable: true,
          },
          hardware_configuration: {
            allOf: [
              {
                $ref: "#/components/schemas/HardwareConfiguration",
              },
            ],
            description: "Information about how the Machine is currently configured.",
          },
          id: {
            description: "Machine Identifier (ID) for the specific Machine.",
            type: "string",
          },
          machine_type: {
            allOf: [
              {
                $ref: "#/components/schemas/MachineType",
              },
            ],
            description: "Information regarding the method of manufacture.",
          },
          make_model: {
            allOf: [
              {
                $ref: "#/components/schemas/MachineMakeModel",
              },
            ],
            description: "Information regarding the make and model of the attached Machine.",
          },
          max_part_volume: {
            allOf: [
              {
                $ref: "#/components/schemas/Volume",
              },
            ],
            description:
              'Maximum part size that can be manufactured by this device. This may be some sort of theoretical upper bound, getting close to this limit seems like maybe a bad idea.\n\nThis may be `None` if the maximum size is not knowable by the Machine API.\n\nWhat "close" means is up to you!',
            nullable: true,
          },
          progress: {
            description: "Progress of the current print, if printing.",
            format: "double",
            nullable: true,
            type: "number",
          },
          state: {
            allOf: [
              {
                $ref: "#/components/schemas/MachineState",
              },
            ],
            description:
              "Status of the printer -- be it printing, idle, or unreachable. This may dictate if a machine is capable of taking a new job.",
          },
        },
        required: ["hardware_configuration", "id", "machine_type", "make_model", "state"],
        type: "object",
      },
      MachineMakeModel: {
        description: "Information regarding the make/model of a discovered endpoint.",
        properties: {
          manufacturer: {
            description: "The manufacturer that built the connected Machine.",
            nullable: true,
            type: "string",
          },
          model: {
            description: "The model of the connected Machine.",
            nullable: true,
            type: "string",
          },
          serial: {
            description: "The unique serial number of the connected Machine.",
            nullable: true,
            type: "string",
          },
        },
        type: "object",
      },
      MachineState: {
        description:
          "Current state of the machine -- be it printing, idle or offline. This can be used to determine if a printer is in the correct state to take a new job.",
        oneOf: [
          {
            description: "If a print state can not be resolved at this time, an Unknown may be returned.",
            properties: {
              state: {
                enum: ["unknown"],
                type: "string",
              },
            },
            required: ["state"],
            type: "object",
          },
          {
            description: "Idle, and ready for another job.",
            properties: {
              state: {
                enum: ["idle"],
                type: "string",
              },
            },
            required: ["state"],
            type: "object",
          },
          {
            description: "Running a job -- 3D printing or CNC-ing a part.",
            properties: {
              state: {
                enum: ["running"],
                type: "string",
              },
            },
            required: ["state"],
            type: "object",
          },
          {
            description: "Machine is currently offline or unreachable.",
            properties: {
              state: {
                enum: ["offline"],
                type: "string",
              },
            },
            required: ["state"],
            type: "object",
          },
          {
            description: "Job is underway but halted, waiting for some action to take place.",
            properties: {
              state: {
                enum: ["paused"],
                type: "string",
              },
            },
            required: ["state"],
            type: "object",
          },
          {
            description: "Job is finished, but waiting manual action to move back to Idle.",
            properties: {
              state: {
                enum: ["complete"],
                type: "string",
              },
            },
            required: ["state"],
            type: "object",
          },
          {
            description:
              "The printer has failed and is in an unknown state that may require manual attention to resolve. The inner value is a human readable description of what specifically has failed.",
            properties: {
              message: {
                description: "A human-readable message describing the failure.",
                nullable: true,
                type: "string",
              },
              state: {
                enum: ["failed"],
                type: "string",
              },
            },
            required: ["state"],
            type: "object",
          },
        ],
      },
      MachineType: {
        description: "Specific technique by which this Machine takes a design, and produces a real-world 3D object.",
        oneOf: [
          {
            description: "Use light to cure a resin to build up layers.",
            enum: ["stereolithography"],
            type: "string",
          },
          {
            description: "Fused Deposition Modeling, layers of melted plastic.",
            enum: ["fused_deposition"],
            type: "string",
          },
          {
            description:
              '"Computer numerical control" - machine that grinds away material from a hunk of material to construct a part.',
            enum: ["cnc"],
            type: "string",
          },
        ],
      },
      NozzleDiameter: {
        description: "A nozzle diameter.",
        oneOf: [
          {
            description: "0.2mm.",
            enum: ["0.2"],
            type: "string",
          },
          {
            description: "0.4mm.",
            enum: ["0.4"],
            type: "string",
          },
          {
            description: "0.6mm.",
            enum: ["0.6"],
            type: "string",
          },
          {
            description: "0.8mm.",
            enum: ["0.8"],
            type: "string",
          },
        ],
      },
      Pong: {
        description: "The response from the `/ping` endpoint.",
        properties: {
          message: {
            description: "The pong response.",
            type: "string",
          },
        },
        required: ["message"],
        type: "object",
      },
      PrintJobResponse: {
        description: "The response from the `/print` endpoint.",
        properties: {
          job_id: {
            description: "The job id used for this print.",
            type: "string",
          },
          parameters: {
            allOf: [
              {
                $ref: "#/components/schemas/PrintParameters",
              },
            ],
            description: "The parameters used for this print.",
          },
        },
        required: ["job_id", "parameters"],
        type: "object",
      },
      PrintParameters: {
        description: "Parameters for printing.",
        properties: {
          job_name: {
            description: "The name for the job.",
            type: "string",
          },
          machine_id: {
            description: "The machine id to print to.",
            type: "string",
          },
          slicer_configuration: {
            allOf: [
              {
                $ref: "#/components/schemas/SlicerConfiguration",
              },
            ],
            description: "Requested design-specific slicer configurations.",
            nullable: true,
          },
        },
        required: ["job_name", "machine_id"],
        type: "object",
      },
      SlicerConfiguration: {
        description:
          "The slicer configuration is a set of parameters that are passed to the slicer to control how the gcode is generated.",
        properties: {
          filament_idx: {
            description: "The filament to use for the print.",
            format: "uint",
            minimum: 0,
            nullable: true,
            type: "integer",
          },
        },
        type: "object",
      },
      Stage: {
        description:
          "The print stage. These come from: https://github.com/SoftFever/OrcaSlicer/blob/431978baf17961df90f0d01871b0ad1d839d7f5d/src/slic3r/GUI/DeviceManager.cpp#L78",
        oneOf: [
          {
            description: "Nothing.",
            enum: ["nothing"],
            type: "string",
          },
          {
            description: "Empty.",
            enum: ["empty"],
            type: "string",
          },
          {
            description: "Auto bed leveling.",
            enum: ["auto_bed_leveling"],
            type: "string",
          },
          {
            description: "Heatbed preheating.",
            enum: ["heatbed_preheating"],
            type: "string",
          },
          {
            description: "Sweeping XY mech mode.",
            enum: ["sweeping_xy_mech_mode"],
            type: "string",
          },
          {
            description: "Changing filament.",
            enum: ["changing_filament"],
            type: "string",
          },
          {
            description: "M400 pause.",
            enum: ["m400_pause"],
            type: "string",
          },
          {
            description: "Paused due to filament runout.",
            enum: ["paused_due_to_filament_runout"],
            type: "string",
          },
          {
            description: "Heating hotend.",
            enum: ["heating_hotend"],
            type: "string",
          },
          {
            description: "Calibrating extrusion.",
            enum: ["calibrating_extrusion"],
            type: "string",
          },
          {
            description: "Scanning bed surface.",
            enum: ["scanning_bed_surface"],
            type: "string",
          },
          {
            description: "Inspecting first layer.",
            enum: ["inspecting_first_layer"],
            type: "string",
          },
          {
            description: "Identifying build plate type.",
            enum: ["identifying_build_plate_type"],
            type: "string",
          },
          {
            description: "Calibrating micro lidar.",
            enum: ["calibrating_micro_lidar"],
            type: "string",
          },
          {
            description: "Homing toolhead.",
            enum: ["homing_toolhead"],
            type: "string",
          },
          {
            description: "Cleaning nozzle tip.",
            enum: ["cleaning_nozzle_tip"],
            type: "string",
          },
          {
            description: "Checking extruder temperature.",
            enum: ["checking_extruder_temperature"],
            type: "string",
          },
          {
            description: "Printing was paused by the user.",
            enum: ["printing_was_paused_by_the_user"],
            type: "string",
          },
          {
            description: "Pause of front cover falling.",
            enum: ["pause_of_front_cover_falling"],
            type: "string",
          },
          {
            description: "Calibrating micro lidar.",
            enum: ["calibrating_micro_lidar2"],
            type: "string",
          },
          {
            description: "Calibrating extrusion flow.",
            enum: ["calibrating_extrusion_flow"],
            type: "string",
          },
          {
            description: "Paused due to nozzle temperature malfunction.",
            enum: ["paused_due_to_nozzle_temperature_malfunction"],
            type: "string",
          },
          {
            description: "Paused due to heat bed temperature malfunction.",
            enum: ["paused_due_to_heat_bed_temperature_malfunction"],
            type: "string",
          },
          {
            description: "Filament unloading.",
            enum: ["filament_unloading"],
            type: "string",
          },
          {
            description: "Skip step pause.",
            enum: ["skip_step_pause"],
            type: "string",
          },
          {
            description: "Filament loading.",
            enum: ["filament_loading"],
            type: "string",
          },
          {
            description: "Motor noise calibration.",
            enum: ["motor_noise_calibration"],
            type: "string",
          },
          {
            description: "Paused due to AMS lost.",
            enum: ["paused_due_to_ams_lost"],
            type: "string",
          },
          {
            description: "Paused due to low speed of the heat break fan.",
            enum: ["paused_due_to_low_speed_of_the_heat_break_fan"],
            type: "string",
          },
          {
            description: "Paused due to chamber temperature control error.",
            enum: ["paused_due_to_chamber_temperature_control_error"],
            type: "string",
          },
          {
            description: "Cooling chamber.",
            enum: ["cooling_chamber"],
            type: "string",
          },
          {
            description: "Paused by the Gcode inserted by the user.",
            enum: ["paused_by_the_gcode_inserted_by_the_user"],
            type: "string",
          },
          {
            description: "Motor noise showoff.",
            enum: ["motor_noise_showoff"],
            type: "string",
          },
          {
            description: "Nozzle filament covered detected pause.",
            enum: ["nozzle_filament_covered_detected_pause"],
            type: "string",
          },
          {
            description: "Cutter error pause.",
            enum: ["cutter_error_pause"],
            type: "string",
          },
          {
            description: "First layer error pause.",
            enum: ["first_layer_error_pause"],
            type: "string",
          },
          {
            description: "Nozzle clog pause.",
            enum: ["nozzle_clog_pause"],
            type: "string",
          },
        ],
      },
      Volume: {
        description:
          "Set of three values to represent the extent of a 3-D Volume. This contains the width, depth, and height values, generally used to represent some maximum or minimum.\n\nAll measurements are in millimeters.",
        properties: {
          depth: {
            description: 'Depth of the volume ("front to back"), in millimeters.',
            format: "double",
            type: "number",
          },
          height: {
            description: 'Height of the volume ("up and down"), in millimeters.',
            format: "double",
            type: "number",
          },
          width: {
            description: 'Width of the volume ("left and right"), in millimeters.',
            format: "double",
            type: "number",
          },
        },
        required: ["depth", "height", "width"],
        type: "object",
      },
    },
  },
  info: {
    contact: {
      email: "machine-api@zoo.dev",
      url: "https://zoo.dev",
    },
    description: "",
    title: "machine-api",
    version: "0.1.1",
  },
  openapi: "3.0.3",
  paths: {
    "/": {
      get: {
        operationId: "api_get_schema",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {},
              },
            },
            description: "successful operation",
          },
          "4XX": {
            $ref: "#/components/responses/Error",
          },
          "5XX": {
            $ref: "#/components/responses/Error",
          },
        },
        summary: "Return the OpenAPI schema in JSON format.",
        tags: ["meta"],
      },
    },
    "/machines": {
      get: {
        operationId: "get_machines",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  items: {
                    $ref: "#/components/schemas/MachineInfoResponse",
                  },
                  title: "Array_of_MachineInfoResponse",
                  type: "array",
                },
              },
            },
            description: "successful operation",
          },
          "4XX": {
            $ref: "#/components/responses/Error",
          },
          "5XX": {
            $ref: "#/components/responses/Error",
          },
        },
        summary: "List available machines and their statuses",
        tags: ["machines"],
      },
    },
    "/machines/{id}": {
      get: {
        operationId: "get_machine",
        parameters: [
          {
            description: "The machine ID.",
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MachineInfoResponse",
                },
              },
            },
            description: "successful operation",
          },
          "4XX": {
            $ref: "#/components/responses/Error",
          },
          "5XX": {
            $ref: "#/components/responses/Error",
          },
        },
        summary: "Get the status of a specific machine",
        tags: ["machines"],
      },
    },
    "/metrics": {
      get: {
        operationId: "get_metrics",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  title: "String",
                  type: "string",
                },
              },
            },
            description: "successful operation",
          },
          "4XX": {
            $ref: "#/components/responses/Error",
          },
          "5XX": {
            $ref: "#/components/responses/Error",
          },
        },
        summary: "List available machines and their statuses",
        tags: ["hidden"],
      },
    },
    "/ping": {
      get: {
        operationId: "ping",
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Pong",
                },
              },
            },
            description: "successful operation",
          },
          "4XX": {
            $ref: "#/components/responses/Error",
          },
          "5XX": {
            $ref: "#/components/responses/Error",
          },
        },
        summary: "Return pong.",
        tags: ["meta"],
      },
    },
    "/print": {
      post: {
        operationId: "print_file",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                format: "binary",
                type: "string",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PrintJobResponse",
                },
              },
            },
            description: "successful operation",
          },
          "4XX": {
            $ref: "#/components/responses/Error",
          },
          "5XX": {
            $ref: "#/components/responses/Error",
          },
        },
        summary: "Print a given file. File must be a sliceable 3D model.",
        tags: ["machines"],
      },
    },
  },
  tags: [
    {
      description: "Hidden API endpoints that should not show up in the docs.",
      externalDocs: {
        url: "https://docs.zoo.dev/api/machines",
      },
      name: "hidden",
    },
    {
      description: "Utilities for making parts and discovering machines.",
      externalDocs: {
        url: "https://docs.zoo.dev/api/machines",
      },
      name: "machines",
    },
    {
      description: "Meta information about the API.",
      externalDocs: {
        url: "https://docs.zoo.dev/api/meta",
      },
      name: "meta",
    },
  ],
}


export const jsonProvider = {
  initialJson: {
    components: {
      responses: {
        Error: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
          description: "Error",
        },
      },
      schemas: {
        Error: {
          description: "Error information from a response.",
          properties: {
            error_code: {
              type: "string",
            },
            message: {
              type: "string",
            },
            request_id: {
              type: "string",
            },
          },
          required: ["message", "request_id"],
          type: "object",
        },
        ExtraMachineInfoResponse: {
          description: "Extra machine-specific information regarding a connected machine.",
          oneOf: [
            {
              properties: {
                type: {
                  enum: ["moonraker"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                type: {
                  enum: ["usb"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                current_stage: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/Stage",
                    },
                  ],
                  description: "The current stage of the machine as defined by Bambu which can include errors, etc.",
                  nullable: true,
                },
                nozzle_diameter: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/NozzleDiameter",
                    },
                  ],
                  description: "The nozzle diameter of the machine.",
                },
                type: {
                  enum: ["bambu"],
                  type: "string",
                },
              },
              required: ["nozzle_diameter", "type"],
              type: "object",
            },
          ],
        },
        FdmHardwareConfiguration: {
          description: "Configuration for a FDM-based printer.",
          properties: {
            filaments: {
              description: "The filaments the printer has access to.",
              items: {
                $ref: "#/components/schemas/Filament",
              },
              type: "array",
            },
            loaded_filament_idx: {
              description: "The currently loaded filament index.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
            nozzle_diameter: {
              description: "Diameter of the extrusion nozzle, in mm.",
              format: "double",
              type: "number",
            },
          },
          required: ["filaments", "nozzle_diameter"],
          type: "object",
        },
        Filament: {
          description: "Information about the filament being used in a FDM printer.",
          properties: {
            color: {
              description:
                "The color (as hex without the `#`) of the filament, this is likely specific to the manufacturer.",
              maxLength: 6,
              minLength: 6,
              nullable: true,
              type: "string",
            },
            material: {
              allOf: [
                {
                  $ref: "#/components/schemas/FilamentMaterial",
                },
              ],
              description: "The material that the filament is made of.",
            },
            name: {
              description: "The name of the filament, this is likely specfic to the manufacturer.",
              nullable: true,
              type: "string",
            },
          },
          required: ["material"],
          type: "object",
        },
        FilamentMaterial: {
          description: "The material that the filament is made of.",
          oneOf: [
            {
              description: "Polylactic acid based plastics",
              properties: {
                type: {
                  enum: ["pla"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Pla support",
              properties: {
                type: {
                  enum: ["pla_support"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "acrylonitrile butadiene styrene based plastics",
              properties: {
                type: {
                  enum: ["abs"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyethylene terephthalate glycol based plastics",
              properties: {
                type: {
                  enum: ["petg"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "unsuprisingly, nylon based",
              properties: {
                type: {
                  enum: ["nylon"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "thermoplastic polyurethane based urethane material",
              properties: {
                type: {
                  enum: ["tpu"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyvinyl alcohol based material",
              properties: {
                type: {
                  enum: ["pva"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "high impact polystyrene based material",
              properties: {
                type: {
                  enum: ["hips"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description:
                "composite material with stuff in other stuff, something like PLA mixed with carbon fiber, kevlar, or fiberglass",
              properties: {
                type: {
                  enum: ["composite"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Unknown material",
              properties: {
                type: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
          ],
        },
        HardwareConfiguration: {
          description: "The hardware configuration of a machine.",
          oneOf: [
            {
              description:
                "No configuration is possible. This isn't the same conceptually as an `Option<HardwareConfiguration>`, because this indicates we positively know there is no possible configuration changes that are possible with this method of manufcture.",
              properties: {
                type: {
                  enum: ["none"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Hardware configuration specific to FDM based printers",
              properties: {
                config: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/FdmHardwareConfiguration",
                    },
                  ],
                  description: "The configuration for the FDM printer.",
                },
                type: {
                  enum: ["fdm"],
                  type: "string",
                },
              },
              required: ["config", "type"],
              type: "object",
            },
          ],
        },
        MachineInfoResponse: {
          description: "Information regarding a connected machine.",
          properties: {
            extra: {
              allOf: [
                {
                  $ref: "#/components/schemas/ExtraMachineInfoResponse",
                },
              ],
              description: "Additional, per-machine information which is specific to the underlying machine type.",
              nullable: true,
            },
            hardware_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/HardwareConfiguration",
                },
              ],
              description: "Information about how the Machine is currently configured.",
            },
            id: {
              description: "Machine Identifier (ID) for the specific Machine.",
              type: "string",
            },
            machine_type: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineType",
                },
              ],
              description: "Information regarding the method of manufacture.",
            },
            make_model: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineMakeModel",
                },
              ],
              description: "Information regarding the make and model of the attached Machine.",
            },
            max_part_volume: {
              allOf: [
                {
                  $ref: "#/components/schemas/Volume",
                },
              ],
              description:
                'Maximum part size that can be manufactured by this device. This may be some sort of theoretical upper bound, getting close to this limit seems like maybe a bad idea.\n\nThis may be `None` if the maximum size is not knowable by the Machine API.\n\nWhat "close" means is up to you!',
              nullable: true,
            },
            progress: {
              description: "Progress of the current print, if printing.",
              format: "double",
              nullable: true,
              type: "number",
            },
            state: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineState",
                },
              ],
              description:
                "Status of the printer -- be it printing, idle, or unreachable. This may dictate if a machine is capable of taking a new job.",
            },
          },
          required: ["hardware_configuration", "id", "machine_type", "make_model", "state"],
          type: "object",
        },
        MachineMakeModel: {
          description: "Information regarding the make/model of a discovered endpoint.",
          properties: {
            manufacturer: {
              description: "The manufacturer that built the connected Machine.",
              nullable: true,
              type: "string",
            },
            model: {
              description: "The model of the connected Machine.",
              nullable: true,
              type: "string",
            },
            serial: {
              description: "The unique serial number of the connected Machine.",
              nullable: true,
              type: "string",
            },
          },
          type: "object",
        },
        MachineState: {
          description:
            "Current state of the machine -- be it printing, idle or offline. This can be used to determine if a printer is in the correct state to take a new job.",
          oneOf: [
            {
              description: "If a print state can not be resolved at this time, an Unknown may be returned.",
              properties: {
                state: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Idle, and ready for another job.",
              properties: {
                state: {
                  enum: ["idle"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Running a job -- 3D printing or CNC-ing a part.",
              properties: {
                state: {
                  enum: ["running"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Machine is currently offline or unreachable.",
              properties: {
                state: {
                  enum: ["offline"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is underway but halted, waiting for some action to take place.",
              properties: {
                state: {
                  enum: ["paused"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is finished, but waiting manual action to move back to Idle.",
              properties: {
                state: {
                  enum: ["complete"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description:
                "The printer has failed and is in an unknown state that may require manual attention to resolve. The inner value is a human readable description of what specifically has failed.",
              properties: {
                message: {
                  description: "A human-readable message describing the failure.",
                  nullable: true,
                  type: "string",
                },
                state: {
                  enum: ["failed"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
          ],
        },
        MachineType: {
          description: "Specific technique by which this Machine takes a design, and produces a real-world 3D object.",
          oneOf: [
            {
              description: "Use light to cure a resin to build up layers.",
              enum: ["stereolithography"],
              type: "string",
            },
            {
              description: "Fused Deposition Modeling, layers of melted plastic.",
              enum: ["fused_deposition"],
              type: "string",
            },
            {
              description:
                '"Computer numerical control" - machine that grinds away material from a hunk of material to construct a part.',
              enum: ["cnc"],
              type: "string",
            },
          ],
        },
        NozzleDiameter: {
          description: "A nozzle diameter.",
          oneOf: [
            {
              description: "0.2mm.",
              enum: ["0.2"],
              type: "string",
            },
            {
              description: "0.4mm.",
              enum: ["0.4"],
              type: "string",
            },
            {
              description: "0.6mm.",
              enum: ["0.6"],
              type: "string",
            },
            {
              description: "0.8mm.",
              enum: ["0.8"],
              type: "string",
            },
          ],
        },
        Pong: {
          description: "The response from the `/ping` endpoint.",
          properties: {
            message: {
              description: "The pong response.",
              type: "string",
            },
          },
          required: ["message"],
          type: "object",
        },
        PrintJobResponse: {
          description: "The response from the `/print` endpoint.",
          properties: {
            job_id: {
              description: "The job id used for this print.",
              type: "string",
            },
            parameters: {
              allOf: [
                {
                  $ref: "#/components/schemas/PrintParameters",
                },
              ],
              description: "The parameters used for this print.",
            },
          },
          required: ["job_id", "parameters"],
          type: "object",
        },
        PrintParameters: {
          description: "Parameters for printing.",
          properties: {
            job_name: {
              description: "The name for the job.",
              type: "string",
            },
            machine_id: {
              description: "The machine id to print to.",
              type: "string",
            },
            slicer_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/SlicerConfiguration",
                },
              ],
              description: "Requested design-specific slicer configurations.",
              nullable: true,
            },
          },
          required: ["job_name", "machine_id"],
          type: "object",
        },
        SlicerConfiguration: {
          description:
            "The slicer configuration is a set of parameters that are passed to the slicer to control how the gcode is generated.",
          properties: {
            filament_idx: {
              description: "The filament to use for the print.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
          },
          type: "object",
        },
        Stage: {
          description:
            "The print stage. These come from: https://github.com/SoftFever/OrcaSlicer/blob/431978baf17961df90f0d01871b0ad1d839d7f5d/src/slic3r/GUI/DeviceManager.cpp#L78",
          oneOf: [
            {
              description: "Nothing.",
              enum: ["nothing"],
              type: "string",
            },
            {
              description: "Empty.",
              enum: ["empty"],
              type: "string",
            },
            {
              description: "Auto bed leveling.",
              enum: ["auto_bed_leveling"],
              type: "string",
            },
            {
              description: "Heatbed preheating.",
              enum: ["heatbed_preheating"],
              type: "string",
            },
            {
              description: "Sweeping XY mech mode.",
              enum: ["sweeping_xy_mech_mode"],
              type: "string",
            },
            {
              description: "Changing filament.",
              enum: ["changing_filament"],
              type: "string",
            },
            {
              description: "M400 pause.",
              enum: ["m400_pause"],
              type: "string",
            },
            {
              description: "Paused due to filament runout.",
              enum: ["paused_due_to_filament_runout"],
              type: "string",
            },
            {
              description: "Heating hotend.",
              enum: ["heating_hotend"],
              type: "string",
            },
            {
              description: "Calibrating extrusion.",
              enum: ["calibrating_extrusion"],
              type: "string",
            },
            {
              description: "Scanning bed surface.",
              enum: ["scanning_bed_surface"],
              type: "string",
            },
            {
              description: "Inspecting first layer.",
              enum: ["inspecting_first_layer"],
              type: "string",
            },
            {
              description: "Identifying build plate type.",
              enum: ["identifying_build_plate_type"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar"],
              type: "string",
            },
            {
              description: "Homing toolhead.",
              enum: ["homing_toolhead"],
              type: "string",
            },
            {
              description: "Cleaning nozzle tip.",
              enum: ["cleaning_nozzle_tip"],
              type: "string",
            },
            {
              description: "Checking extruder temperature.",
              enum: ["checking_extruder_temperature"],
              type: "string",
            },
            {
              description: "Printing was paused by the user.",
              enum: ["printing_was_paused_by_the_user"],
              type: "string",
            },
            {
              description: "Pause of front cover falling.",
              enum: ["pause_of_front_cover_falling"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar2"],
              type: "string",
            },
            {
              description: "Calibrating extrusion flow.",
              enum: ["calibrating_extrusion_flow"],
              type: "string",
            },
            {
              description: "Paused due to nozzle temperature malfunction.",
              enum: ["paused_due_to_nozzle_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Paused due to heat bed temperature malfunction.",
              enum: ["paused_due_to_heat_bed_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Filament unloading.",
              enum: ["filament_unloading"],
              type: "string",
            },
            {
              description: "Skip step pause.",
              enum: ["skip_step_pause"],
              type: "string",
            },
            {
              description: "Filament loading.",
              enum: ["filament_loading"],
              type: "string",
            },
            {
              description: "Motor noise calibration.",
              enum: ["motor_noise_calibration"],
              type: "string",
            },
            {
              description: "Paused due to AMS lost.",
              enum: ["paused_due_to_ams_lost"],
              type: "string",
            },
            {
              description: "Paused due to low speed of the heat break fan.",
              enum: ["paused_due_to_low_speed_of_the_heat_break_fan"],
              type: "string",
            },
            {
              description: "Paused due to chamber temperature control error.",
              enum: ["paused_due_to_chamber_temperature_control_error"],
              type: "string",
            },
            {
              description: "Cooling chamber.",
              enum: ["cooling_chamber"],
              type: "string",
            },
            {
              description: "Paused by the Gcode inserted by the user.",
              enum: ["paused_by_the_gcode_inserted_by_the_user"],
              type: "string",
            },
            {
              description: "Motor noise showoff.",
              enum: ["motor_noise_showoff"],
              type: "string",
            },
            {
              description: "Nozzle filament covered detected pause.",
              enum: ["nozzle_filament_covered_detected_pause"],
              type: "string",
            },
            {
              description: "Cutter error pause.",
              enum: ["cutter_error_pause"],
              type: "string",
            },
            {
              description: "First layer error pause.",
              enum: ["first_layer_error_pause"],
              type: "string",
            },
            {
              description: "Nozzle clog pause.",
              enum: ["nozzle_clog_pause"],
              type: "string",
            },
          ],
        },
        Volume: {
          description:
            "Set of three values to represent the extent of a 3-D Volume. This contains the width, depth, and height values, generally used to represent some maximum or minimum.\n\nAll measurements are in millimeters.",
          properties: {
            depth: {
              description: 'Depth of the volume ("front to back"), in millimeters.',
              format: "double",
              type: "number",
            },
            height: {
              description: 'Height of the volume ("up and down"), in millimeters.',
              format: "double",
              type: "number",
            },
            width: {
              description: 'Width of the volume ("left and right"), in millimeters.',
              format: "double",
              type: "number",
            },
          },
          required: ["depth", "height", "width"],
          type: "object",
        },
      },
    },
    info: {
      contact: {
        email: "machine-api@zoo.dev",
        url: "https://zoo.dev",
      },
      description: "",
      title: "machine-api",
      version: "0.1.1",
    },
    openapi: "3.0.3",
    paths: {
      "/": {
        get: {
          operationId: "api_get_schema",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {},
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return the OpenAPI schema in JSON format.",
          tags: ["meta"],
        },
      },
      "/machines": {
        get: {
          operationId: "get_machines",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    items: {
                      $ref: "#/components/schemas/MachineInfoResponse",
                    },
                    title: "Array_of_MachineInfoResponse",
                    type: "array",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["machines"],
        },
      },
      "/machines/{id}": {
        get: {
          operationId: "get_machine",
          parameters: [
            {
              description: "The machine ID.",
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/MachineInfoResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Get the status of a specific machine",
          tags: ["machines"],
        },
      },
      "/metrics": {
        get: {
          operationId: "get_metrics",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    title: "String",
                    type: "string",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["hidden"],
        },
      },
      "/ping": {
        get: {
          operationId: "ping",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Pong",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return pong.",
          tags: ["meta"],
        },
      },
      "/print": {
        post: {
          operationId: "print_file",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  format: "binary",
                  type: "string",
                },
              },
            },
            required: true,
          },
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PrintJobResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Print a given file. File must be a sliceable 3D model.",
          tags: ["machines"],
        },
      },
    },
    tags: [
      {
        description: "Hidden API endpoints that should not show up in the docs.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "hidden",
      },
      {
        description: "Utilities for making parts and discovering machines.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "machines",
      },
      {
        description: "Meta information about the API.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/meta",
        },
        name: "meta",
      },
    ],
  },
  stablizedJson: {
    components: {
      responses: {
        Error: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
          description: "Error",
        },
      },
      schemas: {
        Error: {
          description: "Error information from a response.",
          properties: {
            error_code: {
              type: "string",
            },
            message: {
              type: "string",
            },
            request_id: {
              type: "string",
            },
          },
          required: ["message", "request_id"],
          type: "object",
        },
        ExtraMachineInfoResponse: {
          description: "Extra machine-specific information regarding a connected machine.",
          oneOf: [
            {
              properties: {
                type: {
                  enum: ["moonraker"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                type: {
                  enum: ["usb"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                current_stage: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/Stage",
                    },
                  ],
                  description: "The current stage of the machine as defined by Bambu which can include errors, etc.",
                  nullable: true,
                },
                nozzle_diameter: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/NozzleDiameter",
                    },
                  ],
                  description: "The nozzle diameter of the machine.",
                },
                type: {
                  enum: ["bambu"],
                  type: "string",
                },
              },
              required: ["nozzle_diameter", "type"],
              type: "object",
            },
          ],
        },
        FdmHardwareConfiguration: {
          description: "Configuration for a FDM-based printer.",
          properties: {
            filaments: {
              description: "The filaments the printer has access to.",
              items: {
                $ref: "#/components/schemas/Filament",
              },
              type: "array",
            },
            loaded_filament_idx: {
              description: "The currently loaded filament index.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
            nozzle_diameter: {
              description: "Diameter of the extrusion nozzle, in mm.",
              format: "double",
              type: "number",
            },
          },
          required: ["filaments", "nozzle_diameter"],
          type: "object",
        },
        Filament: {
          description: "Information about the filament being used in a FDM printer.",
          properties: {
            color: {
              description:
                "The color (as hex without the `#`) of the filament, this is likely specific to the manufacturer.",
              maxLength: 6,
              minLength: 6,
              nullable: true,
              type: "string",
            },
            material: {
              allOf: [
                {
                  $ref: "#/components/schemas/FilamentMaterial",
                },
              ],
              description: "The material that the filament is made of.",
            },
            name: {
              description: "The name of the filament, this is likely specfic to the manufacturer.",
              nullable: true,
              type: "string",
            },
          },
          required: ["material"],
          type: "object",
        },
        FilamentMaterial: {
          description: "The material that the filament is made of.",
          oneOf: [
            {
              description: "Polylactic acid based plastics",
              properties: {
                type: {
                  enum: ["pla"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Pla support",
              properties: {
                type: {
                  enum: ["pla_support"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "acrylonitrile butadiene styrene based plastics",
              properties: {
                type: {
                  enum: ["abs"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyethylene terephthalate glycol based plastics",
              properties: {
                type: {
                  enum: ["petg"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "unsuprisingly, nylon based",
              properties: {
                type: {
                  enum: ["nylon"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "thermoplastic polyurethane based urethane material",
              properties: {
                type: {
                  enum: ["tpu"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyvinyl alcohol based material",
              properties: {
                type: {
                  enum: ["pva"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "high impact polystyrene based material",
              properties: {
                type: {
                  enum: ["hips"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description:
                "composite material with stuff in other stuff, something like PLA mixed with carbon fiber, kevlar, or fiberglass",
              properties: {
                type: {
                  enum: ["composite"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Unknown material",
              properties: {
                type: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
          ],
        },
        HardwareConfiguration: {
          description: "The hardware configuration of a machine.",
          oneOf: [
            {
              description:
                "No configuration is possible. This isn't the same conceptually as an `Option<HardwareConfiguration>`, because this indicates we positively know there is no possible configuration changes that are possible with this method of manufcture.",
              properties: {
                type: {
                  enum: ["none"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Hardware configuration specific to FDM based printers",
              properties: {
                config: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/FdmHardwareConfiguration",
                    },
                  ],
                  description: "The configuration for the FDM printer.",
                },
                type: {
                  enum: ["fdm"],
                  type: "string",
                },
              },
              required: ["config", "type"],
              type: "object",
            },
          ],
        },
        MachineInfoResponse: {
          description: "Information regarding a connected machine.",
          properties: {
            extra: {
              allOf: [
                {
                  $ref: "#/components/schemas/ExtraMachineInfoResponse",
                },
              ],
              description: "Additional, per-machine information which is specific to the underlying machine type.",
              nullable: true,
            },
            hardware_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/HardwareConfiguration",
                },
              ],
              description: "Information about how the Machine is currently configured.",
            },
            id: {
              description: "Machine Identifier (ID) for the specific Machine.",
              type: "string",
            },
            machine_type: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineType",
                },
              ],
              description: "Information regarding the method of manufacture.",
            },
            make_model: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineMakeModel",
                },
              ],
              description: "Information regarding the make and model of the attached Machine.",
            },
            max_part_volume: {
              allOf: [
                {
                  $ref: "#/components/schemas/Volume",
                },
              ],
              description:
                'Maximum part size that can be manufactured by this device. This may be some sort of theoretical upper bound, getting close to this limit seems like maybe a bad idea.\n\nThis may be `None` if the maximum size is not knowable by the Machine API.\n\nWhat "close" means is up to you!',
              nullable: true,
            },
            progress: {
              description: "Progress of the current print, if printing.",
              format: "double",
              nullable: true,
              type: "number",
            },
            state: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineState",
                },
              ],
              description:
                "Status of the printer -- be it printing, idle, or unreachable. This may dictate if a machine is capable of taking a new job.",
            },
          },
          required: ["hardware_configuration", "id", "machine_type", "make_model", "state"],
          type: "object",
        },
        MachineMakeModel: {
          description: "Information regarding the make/model of a discovered endpoint.",
          properties: {
            manufacturer: {
              description: "The manufacturer that built the connected Machine.",
              nullable: true,
              type: "string",
            },
            model: {
              description: "The model of the connected Machine.",
              nullable: true,
              type: "string",
            },
            serial: {
              description: "The unique serial number of the connected Machine.",
              nullable: true,
              type: "string",
            },
          },
          type: "object",
        },
        MachineState: {
          description:
            "Current state of the machine -- be it printing, idle or offline. This can be used to determine if a printer is in the correct state to take a new job.",
          oneOf: [
            {
              description: "If a print state can not be resolved at this time, an Unknown may be returned.",
              properties: {
                state: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Idle, and ready for another job.",
              properties: {
                state: {
                  enum: ["idle"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Running a job -- 3D printing or CNC-ing a part.",
              properties: {
                state: {
                  enum: ["running"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Machine is currently offline or unreachable.",
              properties: {
                state: {
                  enum: ["offline"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is underway but halted, waiting for some action to take place.",
              properties: {
                state: {
                  enum: ["paused"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is finished, but waiting manual action to move back to Idle.",
              properties: {
                state: {
                  enum: ["complete"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description:
                "The printer has failed and is in an unknown state that may require manual attention to resolve. The inner value is a human readable description of what specifically has failed.",
              properties: {
                message: {
                  description: "A human-readable message describing the failure.",
                  nullable: true,
                  type: "string",
                },
                state: {
                  enum: ["failed"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
          ],
        },
        MachineType: {
          description: "Specific technique by which this Machine takes a design, and produces a real-world 3D object.",
          oneOf: [
            {
              description: "Use light to cure a resin to build up layers.",
              enum: ["stereolithography"],
              type: "string",
            },
            {
              description: "Fused Deposition Modeling, layers of melted plastic.",
              enum: ["fused_deposition"],
              type: "string",
            },
            {
              description:
                '"Computer numerical control" - machine that grinds away material from a hunk of material to construct a part.',
              enum: ["cnc"],
              type: "string",
            },
          ],
        },
        NozzleDiameter: {
          description: "A nozzle diameter.",
          oneOf: [
            {
              description: "0.2mm.",
              enum: ["0.2"],
              type: "string",
            },
            {
              description: "0.4mm.",
              enum: ["0.4"],
              type: "string",
            },
            {
              description: "0.6mm.",
              enum: ["0.6"],
              type: "string",
            },
            {
              description: "0.8mm.",
              enum: ["0.8"],
              type: "string",
            },
          ],
        },
        Pong: {
          description: "The response from the `/ping` endpoint.",
          properties: {
            message: {
              description: "The pong response.",
              type: "string",
            },
          },
          required: ["message"],
          type: "object",
        },
        PrintJobResponse: {
          description: "The response from the `/print` endpoint.",
          properties: {
            job_id: {
              description: "The job id used for this print.",
              type: "string",
            },
            parameters: {
              allOf: [
                {
                  $ref: "#/components/schemas/PrintParameters",
                },
              ],
              description: "The parameters used for this print.",
            },
          },
          required: ["job_id", "parameters"],
          type: "object",
        },
        PrintParameters: {
          description: "Parameters for printing.",
          properties: {
            job_name: {
              description: "The name for the job.",
              type: "string",
            },
            machine_id: {
              description: "The machine id to print to.",
              type: "string",
            },
            slicer_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/SlicerConfiguration",
                },
              ],
              description: "Requested design-specific slicer configurations.",
              nullable: true,
            },
          },
          required: ["job_name", "machine_id"],
          type: "object",
        },
        SlicerConfiguration: {
          description:
            "The slicer configuration is a set of parameters that are passed to the slicer to control how the gcode is generated.",
          properties: {
            filament_idx: {
              description: "The filament to use for the print.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
          },
          type: "object",
        },
        Stage: {
          description:
            "The print stage. These come from: https://github.com/SoftFever/OrcaSlicer/blob/431978baf17961df90f0d01871b0ad1d839d7f5d/src/slic3r/GUI/DeviceManager.cpp#L78",
          oneOf: [
            {
              description: "Nothing.",
              enum: ["nothing"],
              type: "string",
            },
            {
              description: "Empty.",
              enum: ["empty"],
              type: "string",
            },
            {
              description: "Auto bed leveling.",
              enum: ["auto_bed_leveling"],
              type: "string",
            },
            {
              description: "Heatbed preheating.",
              enum: ["heatbed_preheating"],
              type: "string",
            },
            {
              description: "Sweeping XY mech mode.",
              enum: ["sweeping_xy_mech_mode"],
              type: "string",
            },
            {
              description: "Changing filament.",
              enum: ["changing_filament"],
              type: "string",
            },
            {
              description: "M400 pause.",
              enum: ["m400_pause"],
              type: "string",
            },
            {
              description: "Paused due to filament runout.",
              enum: ["paused_due_to_filament_runout"],
              type: "string",
            },
            {
              description: "Heating hotend.",
              enum: ["heating_hotend"],
              type: "string",
            },
            {
              description: "Calibrating extrusion.",
              enum: ["calibrating_extrusion"],
              type: "string",
            },
            {
              description: "Scanning bed surface.",
              enum: ["scanning_bed_surface"],
              type: "string",
            },
            {
              description: "Inspecting first layer.",
              enum: ["inspecting_first_layer"],
              type: "string",
            },
            {
              description: "Identifying build plate type.",
              enum: ["identifying_build_plate_type"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar"],
              type: "string",
            },
            {
              description: "Homing toolhead.",
              enum: ["homing_toolhead"],
              type: "string",
            },
            {
              description: "Cleaning nozzle tip.",
              enum: ["cleaning_nozzle_tip"],
              type: "string",
            },
            {
              description: "Checking extruder temperature.",
              enum: ["checking_extruder_temperature"],
              type: "string",
            },
            {
              description: "Printing was paused by the user.",
              enum: ["printing_was_paused_by_the_user"],
              type: "string",
            },
            {
              description: "Pause of front cover falling.",
              enum: ["pause_of_front_cover_falling"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar2"],
              type: "string",
            },
            {
              description: "Calibrating extrusion flow.",
              enum: ["calibrating_extrusion_flow"],
              type: "string",
            },
            {
              description: "Paused due to nozzle temperature malfunction.",
              enum: ["paused_due_to_nozzle_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Paused due to heat bed temperature malfunction.",
              enum: ["paused_due_to_heat_bed_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Filament unloading.",
              enum: ["filament_unloading"],
              type: "string",
            },
            {
              description: "Skip step pause.",
              enum: ["skip_step_pause"],
              type: "string",
            },
            {
              description: "Filament loading.",
              enum: ["filament_loading"],
              type: "string",
            },
            {
              description: "Motor noise calibration.",
              enum: ["motor_noise_calibration"],
              type: "string",
            },
            {
              description: "Paused due to AMS lost.",
              enum: ["paused_due_to_ams_lost"],
              type: "string",
            },
            {
              description: "Paused due to low speed of the heat break fan.",
              enum: ["paused_due_to_low_speed_of_the_heat_break_fan"],
              type: "string",
            },
            {
              description: "Paused due to chamber temperature control error.",
              enum: ["paused_due_to_chamber_temperature_control_error"],
              type: "string",
            },
            {
              description: "Cooling chamber.",
              enum: ["cooling_chamber"],
              type: "string",
            },
            {
              description: "Paused by the Gcode inserted by the user.",
              enum: ["paused_by_the_gcode_inserted_by_the_user"],
              type: "string",
            },
            {
              description: "Motor noise showoff.",
              enum: ["motor_noise_showoff"],
              type: "string",
            },
            {
              description: "Nozzle filament covered detected pause.",
              enum: ["nozzle_filament_covered_detected_pause"],
              type: "string",
            },
            {
              description: "Cutter error pause.",
              enum: ["cutter_error_pause"],
              type: "string",
            },
            {
              description: "First layer error pause.",
              enum: ["first_layer_error_pause"],
              type: "string",
            },
            {
              description: "Nozzle clog pause.",
              enum: ["nozzle_clog_pause"],
              type: "string",
            },
          ],
        },
        Volume: {
          description:
            "Set of three values to represent the extent of a 3-D Volume. This contains the width, depth, and height values, generally used to represent some maximum or minimum.\n\nAll measurements are in millimeters.",
          properties: {
            depth: {
              description: 'Depth of the volume ("front to back"), in millimeters.',
              format: "double",
              type: "number",
            },
            height: {
              description: 'Height of the volume ("up and down"), in millimeters.',
              format: "double",
              type: "number",
            },
            width: {
              description: 'Width of the volume ("left and right"), in millimeters.',
              format: "double",
              type: "number",
            },
          },
          required: ["depth", "height", "width"],
          type: "object",
        },
      },
    },
    info: {
      contact: {
        email: "machine-api@zoo.dev",
        url: "https://zoo.dev",
      },
      description: "",
      title: "machine-api",
      version: "0.1.1",
    },
    openapi: "3.0.3",
    paths: {
      "/": {
        get: {
          operationId: "api_get_schema",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {},
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return the OpenAPI schema in JSON format.",
          tags: ["meta"],
        },
      },
      "/machines": {
        get: {
          operationId: "get_machines",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    items: {
                      $ref: "#/components/schemas/MachineInfoResponse",
                    },
                    title: "Array_of_MachineInfoResponse",
                    type: "array",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["machines"],
        },
      },
      "/machines/{id}": {
        get: {
          operationId: "get_machine",
          parameters: [
            {
              description: "The machine ID.",
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/MachineInfoResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Get the status of a specific machine",
          tags: ["machines"],
        },
      },
      "/metrics": {
        get: {
          operationId: "get_metrics",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    title: "String",
                    type: "string",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["hidden"],
        },
      },
      "/ping": {
        get: {
          operationId: "ping",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Pong",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return pong.",
          tags: ["meta"],
        },
      },
      "/print": {
        post: {
          operationId: "print_file",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  format: "binary",
                  type: "string",
                },
              },
            },
            required: true,
          },
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PrintJobResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Print a given file. File must be a sliceable 3D model.",
          tags: ["machines"],
        },
      },
    },
    tags: [
      {
        description: "Hidden API endpoints that should not show up in the docs.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "hidden",
      },
      {
        description: "Utilities for making parts and discovering machines.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "machines",
      },
      {
        description: "Meta information about the API.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/meta",
        },
        name: "meta",
      },
    ],
  },
  json: {
    components: {
      responses: {
        Error: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
          description: "Error",
        },
      },
      schemas: {
        Error: {
          description: "Error information from a response.",
          properties: {
            error_code: {
              type: "string",
            },
            message: {
              type: "string",
            },
            request_id: {
              type: "string",
            },
          },
          required: ["message", "request_id"],
          type: "object",
        },
        ExtraMachineInfoResponse: {
          description: "Extra machine-specific information regarding a connected machine.",
          oneOf: [
            {
              properties: {
                type: {
                  enum: ["moonraker"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                type: {
                  enum: ["usb"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              properties: {
                current_stage: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/Stage",
                    },
                  ],
                  description: "The current stage of the machine as defined by Bambu which can include errors, etc.",
                  nullable: true,
                },
                nozzle_diameter: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/NozzleDiameter",
                    },
                  ],
                  description: "The nozzle diameter of the machine.",
                },
                type: {
                  enum: ["bambu"],
                  type: "string",
                },
              },
              required: ["nozzle_diameter", "type"],
              type: "object",
            },
          ],
        },
        FdmHardwareConfiguration: {
          description: "Configuration for a FDM-based printer.",
          properties: {
            filaments: {
              description: "The filaments the printer has access to.",
              items: {
                $ref: "#/components/schemas/Filament",
              },
              type: "array",
            },
            loaded_filament_idx: {
              description: "The currently loaded filament index.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
            nozzle_diameter: {
              description: "Diameter of the extrusion nozzle, in mm.",
              format: "double",
              type: "number",
            },
          },
          required: ["filaments", "nozzle_diameter"],
          type: "object",
        },
        Filament: {
          description: "Information about the filament being used in a FDM printer.",
          properties: {
            color: {
              description:
                "The color (as hex without the `#`) of the filament, this is likely specific to the manufacturer.",
              maxLength: 6,
              minLength: 6,
              nullable: true,
              type: "string",
            },
            material: {
              allOf: [
                {
                  $ref: "#/components/schemas/FilamentMaterial",
                },
              ],
              description: "The material that the filament is made of.",
            },
            name: {
              description: "The name of the filament, this is likely specfic to the manufacturer.",
              nullable: true,
              type: "string",
            },
          },
          required: ["material"],
          type: "object",
        },
        FilamentMaterial: {
          description: "The material that the filament is made of.",
          oneOf: [
            {
              description: "Polylactic acid based plastics",
              properties: {
                type: {
                  enum: ["pla"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Pla support",
              properties: {
                type: {
                  enum: ["pla_support"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "acrylonitrile butadiene styrene based plastics",
              properties: {
                type: {
                  enum: ["abs"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyethylene terephthalate glycol based plastics",
              properties: {
                type: {
                  enum: ["petg"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "unsuprisingly, nylon based",
              properties: {
                type: {
                  enum: ["nylon"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "thermoplastic polyurethane based urethane material",
              properties: {
                type: {
                  enum: ["tpu"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "polyvinyl alcohol based material",
              properties: {
                type: {
                  enum: ["pva"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "high impact polystyrene based material",
              properties: {
                type: {
                  enum: ["hips"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description:
                "composite material with stuff in other stuff, something like PLA mixed with carbon fiber, kevlar, or fiberglass",
              properties: {
                type: {
                  enum: ["composite"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Unknown material",
              properties: {
                type: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
          ],
        },
        HardwareConfiguration: {
          description: "The hardware configuration of a machine.",
          oneOf: [
            {
              description:
                "No configuration is possible. This isn't the same conceptually as an `Option<HardwareConfiguration>`, because this indicates we positively know there is no possible configuration changes that are possible with this method of manufcture.",
              properties: {
                type: {
                  enum: ["none"],
                  type: "string",
                },
              },
              required: ["type"],
              type: "object",
            },
            {
              description: "Hardware configuration specific to FDM based printers",
              properties: {
                config: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/FdmHardwareConfiguration",
                    },
                  ],
                  description: "The configuration for the FDM printer.",
                },
                type: {
                  enum: ["fdm"],
                  type: "string",
                },
              },
              required: ["config", "type"],
              type: "object",
            },
          ],
        },
        MachineInfoResponse: {
          description: "Information regarding a connected machine.",
          properties: {
            extra: {
              allOf: [
                {
                  $ref: "#/components/schemas/ExtraMachineInfoResponse",
                },
              ],
              description: "Additional, per-machine information which is specific to the underlying machine type.",
              nullable: true,
            },
            hardware_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/HardwareConfiguration",
                },
              ],
              description: "Information about how the Machine is currently configured.",
            },
            id: {
              description: "Machine Identifier (ID) for the specific Machine.",
              type: "string",
            },
            machine_type: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineType",
                },
              ],
              description: "Information regarding the method of manufacture.",
            },
            make_model: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineMakeModel",
                },
              ],
              description: "Information regarding the make and model of the attached Machine.",
            },
            max_part_volume: {
              allOf: [
                {
                  $ref: "#/components/schemas/Volume",
                },
              ],
              description:
                'Maximum part size that can be manufactured by this device. This may be some sort of theoretical upper bound, getting close to this limit seems like maybe a bad idea.\n\nThis may be `None` if the maximum size is not knowable by the Machine API.\n\nWhat "close" means is up to you!',
              nullable: true,
            },
            progress: {
              description: "Progress of the current print, if printing.",
              format: "double",
              nullable: true,
              type: "number",
            },
            state: {
              allOf: [
                {
                  $ref: "#/components/schemas/MachineState",
                },
              ],
              description:
                "Status of the printer -- be it printing, idle, or unreachable. This may dictate if a machine is capable of taking a new job.",
            },
          },
          required: ["hardware_configuration", "id", "machine_type", "make_model", "state"],
          type: "object",
        },
        MachineMakeModel: {
          description: "Information regarding the make/model of a discovered endpoint.",
          properties: {
            manufacturer: {
              description: "The manufacturer that built the connected Machine.",
              nullable: true,
              type: "string",
            },
            model: {
              description: "The model of the connected Machine.",
              nullable: true,
              type: "string",
            },
            serial: {
              description: "The unique serial number of the connected Machine.",
              nullable: true,
              type: "string",
            },
          },
          type: "object",
        },
        MachineState: {
          description:
            "Current state of the machine -- be it printing, idle or offline. This can be used to determine if a printer is in the correct state to take a new job.",
          oneOf: [
            {
              description: "If a print state can not be resolved at this time, an Unknown may be returned.",
              properties: {
                state: {
                  enum: ["unknown"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Idle, and ready for another job.",
              properties: {
                state: {
                  enum: ["idle"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Running a job -- 3D printing or CNC-ing a part.",
              properties: {
                state: {
                  enum: ["running"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Machine is currently offline or unreachable.",
              properties: {
                state: {
                  enum: ["offline"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is underway but halted, waiting for some action to take place.",
              properties: {
                state: {
                  enum: ["paused"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description: "Job is finished, but waiting manual action to move back to Idle.",
              properties: {
                state: {
                  enum: ["complete"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
            {
              description:
                "The printer has failed and is in an unknown state that may require manual attention to resolve. The inner value is a human readable description of what specifically has failed.",
              properties: {
                message: {
                  description: "A human-readable message describing the failure.",
                  nullable: true,
                  type: "string",
                },
                state: {
                  enum: ["failed"],
                  type: "string",
                },
              },
              required: ["state"],
              type: "object",
            },
          ],
        },
        MachineType: {
          description: "Specific technique by which this Machine takes a design, and produces a real-world 3D object.",
          oneOf: [
            {
              description: "Use light to cure a resin to build up layers.",
              enum: ["stereolithography"],
              type: "string",
            },
            {
              description: "Fused Deposition Modeling, layers of melted plastic.",
              enum: ["fused_deposition"],
              type: "string",
            },
            {
              description:
                '"Computer numerical control" - machine that grinds away material from a hunk of material to construct a part.',
              enum: ["cnc"],
              type: "string",
            },
          ],
        },
        NozzleDiameter: {
          description: "A nozzle diameter.",
          oneOf: [
            {
              description: "0.2mm.",
              enum: ["0.2"],
              type: "string",
            },
            {
              description: "0.4mm.",
              enum: ["0.4"],
              type: "string",
            },
            {
              description: "0.6mm.",
              enum: ["0.6"],
              type: "string",
            },
            {
              description: "0.8mm.",
              enum: ["0.8"],
              type: "string",
            },
          ],
        },
        Pong: {
          description: "The response from the `/ping` endpoint.",
          properties: {
            message: {
              description: "The pong response.",
              type: "string",
            },
          },
          required: ["message"],
          type: "object",
        },
        PrintJobResponse: {
          description: "The response from the `/print` endpoint.",
          properties: {
            job_id: {
              description: "The job id used for this print.",
              type: "string",
            },
            parameters: {
              allOf: [
                {
                  $ref: "#/components/schemas/PrintParameters",
                },
              ],
              description: "The parameters used for this print.",
            },
          },
          required: ["job_id", "parameters"],
          type: "object",
        },
        PrintParameters: {
          description: "Parameters for printing.",
          properties: {
            job_name: {
              description: "The name for the job.",
              type: "string",
            },
            machine_id: {
              description: "The machine id to print to.",
              type: "string",
            },
            slicer_configuration: {
              allOf: [
                {
                  $ref: "#/components/schemas/SlicerConfiguration",
                },
              ],
              description: "Requested design-specific slicer configurations.",
              nullable: true,
            },
          },
          required: ["job_name", "machine_id"],
          type: "object",
        },
        SlicerConfiguration: {
          description:
            "The slicer configuration is a set of parameters that are passed to the slicer to control how the gcode is generated.",
          properties: {
            filament_idx: {
              description: "The filament to use for the print.",
              format: "uint",
              minimum: 0,
              nullable: true,
              type: "integer",
            },
          },
          type: "object",
        },
        Stage: {
          description:
            "The print stage. These come from: https://github.com/SoftFever/OrcaSlicer/blob/431978baf17961df90f0d01871b0ad1d839d7f5d/src/slic3r/GUI/DeviceManager.cpp#L78",
          oneOf: [
            {
              description: "Nothing.",
              enum: ["nothing"],
              type: "string",
            },
            {
              description: "Empty.",
              enum: ["empty"],
              type: "string",
            },
            {
              description: "Auto bed leveling.",
              enum: ["auto_bed_leveling"],
              type: "string",
            },
            {
              description: "Heatbed preheating.",
              enum: ["heatbed_preheating"],
              type: "string",
            },
            {
              description: "Sweeping XY mech mode.",
              enum: ["sweeping_xy_mech_mode"],
              type: "string",
            },
            {
              description: "Changing filament.",
              enum: ["changing_filament"],
              type: "string",
            },
            {
              description: "M400 pause.",
              enum: ["m400_pause"],
              type: "string",
            },
            {
              description: "Paused due to filament runout.",
              enum: ["paused_due_to_filament_runout"],
              type: "string",
            },
            {
              description: "Heating hotend.",
              enum: ["heating_hotend"],
              type: "string",
            },
            {
              description: "Calibrating extrusion.",
              enum: ["calibrating_extrusion"],
              type: "string",
            },
            {
              description: "Scanning bed surface.",
              enum: ["scanning_bed_surface"],
              type: "string",
            },
            {
              description: "Inspecting first layer.",
              enum: ["inspecting_first_layer"],
              type: "string",
            },
            {
              description: "Identifying build plate type.",
              enum: ["identifying_build_plate_type"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar"],
              type: "string",
            },
            {
              description: "Homing toolhead.",
              enum: ["homing_toolhead"],
              type: "string",
            },
            {
              description: "Cleaning nozzle tip.",
              enum: ["cleaning_nozzle_tip"],
              type: "string",
            },
            {
              description: "Checking extruder temperature.",
              enum: ["checking_extruder_temperature"],
              type: "string",
            },
            {
              description: "Printing was paused by the user.",
              enum: ["printing_was_paused_by_the_user"],
              type: "string",
            },
            {
              description: "Pause of front cover falling.",
              enum: ["pause_of_front_cover_falling"],
              type: "string",
            },
            {
              description: "Calibrating micro lidar.",
              enum: ["calibrating_micro_lidar2"],
              type: "string",
            },
            {
              description: "Calibrating extrusion flow.",
              enum: ["calibrating_extrusion_flow"],
              type: "string",
            },
            {
              description: "Paused due to nozzle temperature malfunction.",
              enum: ["paused_due_to_nozzle_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Paused due to heat bed temperature malfunction.",
              enum: ["paused_due_to_heat_bed_temperature_malfunction"],
              type: "string",
            },
            {
              description: "Filament unloading.",
              enum: ["filament_unloading"],
              type: "string",
            },
            {
              description: "Skip step pause.",
              enum: ["skip_step_pause"],
              type: "string",
            },
            {
              description: "Filament loading.",
              enum: ["filament_loading"],
              type: "string",
            },
            {
              description: "Motor noise calibration.",
              enum: ["motor_noise_calibration"],
              type: "string",
            },
            {
              description: "Paused due to AMS lost.",
              enum: ["paused_due_to_ams_lost"],
              type: "string",
            },
            {
              description: "Paused due to low speed of the heat break fan.",
              enum: ["paused_due_to_low_speed_of_the_heat_break_fan"],
              type: "string",
            },
            {
              description: "Paused due to chamber temperature control error.",
              enum: ["paused_due_to_chamber_temperature_control_error"],
              type: "string",
            },
            {
              description: "Cooling chamber.",
              enum: ["cooling_chamber"],
              type: "string",
            },
            {
              description: "Paused by the Gcode inserted by the user.",
              enum: ["paused_by_the_gcode_inserted_by_the_user"],
              type: "string",
            },
            {
              description: "Motor noise showoff.",
              enum: ["motor_noise_showoff"],
              type: "string",
            },
            {
              description: "Nozzle filament covered detected pause.",
              enum: ["nozzle_filament_covered_detected_pause"],
              type: "string",
            },
            {
              description: "Cutter error pause.",
              enum: ["cutter_error_pause"],
              type: "string",
            },
            {
              description: "First layer error pause.",
              enum: ["first_layer_error_pause"],
              type: "string",
            },
            {
              description: "Nozzle clog pause.",
              enum: ["nozzle_clog_pause"],
              type: "string",
            },
          ],
        },
        Volume: {
          description:
            "Set of three values to represent the extent of a 3-D Volume. This contains the width, depth, and height values, generally used to represent some maximum or minimum.\n\nAll measurements are in millimeters.",
          properties: {
            depth: {
              description: 'Depth of the volume ("front to back"), in millimeters.',
              format: "double",
              type: "number",
            },
            height: {
              description: 'Height of the volume ("up and down"), in millimeters.',
              format: "double",
              type: "number",
            },
            width: {
              description: 'Width of the volume ("left and right"), in millimeters.',
              format: "double",
              type: "number",
            },
          },
          required: ["depth", "height", "width"],
          type: "object",
        },
      },
    },
    info: {
      contact: {
        email: "machine-api@zoo.dev",
        url: "https://zoo.dev",
      },
      description: "",
      title: "machine-api",
      version: "0.1.1",
    },
    openapi: "3.0.3",
    paths: {
      "/": {
        get: {
          operationId: "api_get_schema",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {},
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return the OpenAPI schema in JSON format.",
          tags: ["meta"],
        },
      },
      "/machines": {
        get: {
          operationId: "get_machines",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    items: {
                      $ref: "#/components/schemas/MachineInfoResponse",
                    },
                    title: "Array_of_MachineInfoResponse",
                    type: "array",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["machines"],
        },
      },
      "/machines/{id}": {
        get: {
          operationId: "get_machine",
          parameters: [
            {
              description: "The machine ID.",
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/MachineInfoResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Get the status of a specific machine",
          tags: ["machines"],
        },
      },
      "/metrics": {
        get: {
          operationId: "get_metrics",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    title: "String",
                    type: "string",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "List available machines and their statuses",
          tags: ["hidden"],
        },
      },
      "/ping": {
        get: {
          operationId: "ping",
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Pong",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Return pong.",
          tags: ["meta"],
        },
      },
      "/print": {
        post: {
          operationId: "print_file",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  format: "binary",
                  type: "string",
                },
              },
            },
            required: true,
          },
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PrintJobResponse",
                  },
                },
              },
              description: "successful operation",
            },
            "4XX": {
              $ref: "#/components/responses/Error",
            },
            "5XX": {
              $ref: "#/components/responses/Error",
            },
          },
          summary: "Print a given file. File must be a sliceable 3D model.",
          tags: ["machines"],
        },
      },
    },
    tags: [
      {
        description: "Hidden API endpoints that should not show up in the docs.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "hidden",
      },
      {
        description: "Utilities for making parts and discovering machines.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/machines",
        },
        name: "machines",
      },
      {
        description: "Meta information about the API.",
        externalDocs: {
          url: "https://docs.zoo.dev/api/meta",
        },
        name: "meta",
      },
    ],
  },
}