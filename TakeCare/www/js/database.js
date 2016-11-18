var database =
{
  "persons" : {
    "Alice" : {
      "teams" : {
        "TeamCharilearoline": {"own":false},
        "TeamMartin": {"own":true}
      }
    },
    "Bertrand" : {
      "teams" : {
        "TeamMartin": {"own":false},
        "TeamCharile": {"own":true}
      }
    },
    "Caroline" : {
      "teams" : {
        "TeamCharilearoline": {"own":true},
        "TeamMartin": {"own":true},
        "TeamCharile": {"own":false}
      }
    },
    "Dennis" : {
      "teams" : {
        "TeamCharilearoline": {"own":false}
      }
    }
  },
  "teams" : {
    "TeamCharilearoline" : {
      "owners" : [ 
        "Caroline"  
      ],
      "tasks" : {
        
      },
      "updates" : {     
      }
    },
    "TeamMartin" : {
      "owners" : [ 
        "Alice, Caroline"  
      ],
      "tasks" : {
      },
      "updates" : {
      }
    },
    "TeamCharile" : {
      "owners" : [ 
        "Bertrand"  
      ],
      "tasks" : {
      },
      "updates" : {
      }
    }
  }
};