const log = {
  "activeFlow": {
    "id": "basic-demo",
    "name": "Basic Demo Flow",
    "version": "1.0.0",
    "description": "Simple user registration flow",
    "initialStep": "personal-info",
    "context": {
      "user": {},
      "errors": []
    },
    "steps": [
      {
        "id": "personal-info",
        "name": "Personal Information",
        "view": {
          "type": "form",
          "title": "Personal Information",
          "subtitle": "Please provide your basic information",
          "fields": [
            {
              "name": "firstName",
              "type": "text",
              "label": "First Name",
              "required": true,
              "placeholder": "Enter your first name",
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "lastName",
              "type": "text",
              "label": "Last Name",
              "required": true,
              "placeholder": "Enter your last name",
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "email",
              "type": "email",
              "label": "Email Address",
              "required": true,
              "placeholder": "Enter your email address"
            }
          ],
          "actions": [
            {
              "type": "submit",
              "label": "Continue",
              "event": "NEXT"
            },
            {
              "type": "button",
              "label": "Back",
              "event": "BACK"
            }
          ]
        },
        "hooks": {
          "after": [
            {
              "id": "save-personal-info",
              "type": "assign",
              "target": "user.personalInfo",
              "value": "{{event.data}}"
            }
          ]
        },
        "navigation": {
          "onNext": "verify-email",
          "onBack": "welcome"
        }
      },
      {
        "id": "verify-email",
        "name": "Email Verification",
        "view": {
          "type": "display",
          "title": "Verify Your Email",
          "message": "We've sent a verification link to {{context.user.personalInfo.email}}",
          "actions": [
            {
              "type": "button",
              "label": "Resend Email",
              "event": "RESEND"
            },
            {
              "type": "button",
              "label": "I've Verified",
              "event": "EMAIL_VERIFIED"
            },
            {
              "type": "button",
              "label": "Back",
              "event": "BACK"
            }
          ]
        },
        "invoke": {
          "id": "send-verification",
          "src": "httpClient",
          "input": {
            "endpoint": "/api/send-verification",
            "method": "POST",
            "body": "{{context.user.personalInfo.email}}"
          },
          "onDone": {
            "target": "verification-sent"
          },
          "onError": {
            "target": "error-step"
          }
        },
        "navigation": {
          "onNext": "success",
          "onBack": "personal-info"
        }
      },
      {
        "id": "success",
        "name": "Registration Complete",
        "view": {
          "type": "success",
          "title": "Registration Complete!",
          "message": "Welcome to our platform!",
          "template": "Hello {{context.user.personalInfo.firstName}}!",
          "actions": [
            {
              "type": "button",
              "label": "Continue",
              "event": "NEXT"
            }
          ]
        }
      }
    ]
  },
  "defaultFlow": {
    "id": "basic-demo",
    "name": "Basic Demo Flow",
    "version": "1.0.0",
    "description": "Simple user registration flow",
    "initialStep": "personal-info",
    "context": {
      "user": {},
      "errors": []
    },
    "steps": [
      {
        "id": "personal-info",
        "name": "Personal Information",
        "view": {
          "type": "form",
          "title": "Personal Information",
          "subtitle": "Please provide your basic information",
          "fields": [
            {
              "name": "firstName",
              "type": "text",
              "label": "First Name",
              "required": true,
              "placeholder": "Enter your first name",
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "lastName",
              "type": "text",
              "label": "Last Name",
              "required": true,
              "placeholder": "Enter your last name",
              "validation": {
                "minLength": 2,
                "maxLength": 50
              }
            },
            {
              "name": "email",
              "type": "email",
              "label": "Email Address",
              "required": true,
              "placeholder": "Enter your email address"
            }
          ],
          "actions": [
            {
              "type": "submit",
              "label": "Continue",
              "event": "NEXT"
            },
            {
              "type": "button",
              "label": "Back",
              "event": "BACK"
            }
          ]
        },
        "hooks": {
          "after": [
            {
              "id": "save-personal-info",
              "type": "assign",
              "target": "user.personalInfo",
              "value": "{{event.data}}"
            }
          ]
        },
        "navigation": {
          "onNext": "verify-email",
          "onBack": "welcome"
        }
      },
      {
        "id": "verify-email",
        "name": "Email Verification",
        "view": {
          "type": "display",
          "title": "Verify Your Email",
          "message": "We've sent a verification link to {{context.user.personalInfo.email}}",
          "actions": [
            {
              "type": "button",
              "label": "Resend Email",
              "event": "RESEND"
            },
            {
              "type": "button",
              "label": "I've Verified",
              "event": "EMAIL_VERIFIED"
            },
            {
              "type": "button",
              "label": "Back",
              "event": "BACK"
            }
          ]
        },
        "invoke": {
          "id": "send-verification",
          "src": "httpClient",
          "input": {
            "endpoint": "/api/send-verification",
            "method": "POST",
            "body": "{{context.user.personalInfo.email}}"
          },
          "onDone": {
            "target": "verification-sent"
          },
          "onError": {
            "target": "error-step"
          }
        },
        "navigation": {
          "onNext": "success",
          "onBack": "personal-info"
        }
      },
      {
        "id": "success",
        "name": "Registration Complete",
        "view": {
          "type": "success",
          "title": "Registration Complete!",
          "message": "Welcome to our platform!",
          "template": "Hello {{context.user.personalInfo.firstName}}!",
          "actions": [
            {
              "type": "button",
              "label": "Continue",
              "event": "NEXT"
            }
          ]
        }
      }
    ]
  },
  "flowError": null,
  "selectedPanel": "editor",
  "panelLayout": "split-2",
  "selectedExample": "",
  "currentState": "",
  "eventCount": 0,
  "renderTime": 0,
  "updateCount": 0
}
