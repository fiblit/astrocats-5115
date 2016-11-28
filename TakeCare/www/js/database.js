var database =
{
  "persons" : {
    "Alice" : {
      "password" : "admin",
      "teams" : {
        "TeamCharilearoline": {"own":false},
        "TeamMartin": {"own":true}
      }
    },
    "Bertrand" : {
      "password" : "admin",
      "teams" : {
        "TeamMartin": {"own":false},
        "TeamCharile": {"own":true}
      }
    },
    "Caroline" : {
      "password" : "admin",
      "teams" : {
        "TeamCharilearoline": {"own":true},
        "TeamMartin": {"own":true},
        "TeamCharile": {"own":false}
      }
    },
    "Dennis" : {
      "password" : "admin",
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
      "tasks" : [
        {"name": "Cookies",
        "time": 1480348031365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "description": "We need 2 boxes of cookies"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Charilearoline make updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    },
    "TeamMartin" : {
      "owners" : [ 
        "Alice, Caroline"  
      ],
      "tasks" :  [
        {"name": "Brownies",
        "time": 1480349031365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "description": "We need 2 boxes of brownies"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Martin make updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    },
    "TeamCharile" : {
      "owners" : [ 
        "Bertrand"  
      ],
      "tasks" :  [
        {"name": "Milk",
        "time": 1480349931365,
        "location": "Keller Hall, MN",
        "importance": "Necessary",
        "description": "We need 2 tons of frozen milk ASAP"}
      ],
      "updates" : [
        {"title": "The Best Update",
        "time" : 1480347929365,
        "html": "<p>Charile make updates</p><p>The absolute best updates</p>"},
        {"title": "The Worst Update",
        "time" : 1480347930365,
        "html": "<p>The absolute <i>worst</i></p>"},
        {"title": "FANCY",
        "time" : 1480347931365,
        "html": "<p>FANCY <span style=\"color:red;\">PANTS</span></p>"}
      ]
    }
  }
};