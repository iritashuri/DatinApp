# overview
this is an overview of the service we propose by this explained later endpoints.
The API is generally RESTFUL and returns results in JSON.

# endpoints
| Endpoint        | Method           | Description  |
| ------------- |:-------------:| -----:|
| /users      | POST | sign up |

## Request scheme
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| endpoint | string | /endpoint |
| method | string | post/get |
| headers      | {} | additional information as user id|
| body | string | request data |

####Example
```
  endpoint: "/users",
  method: "POST",
  body: "json_object",
  headers: {"userId": "1234"}
```

## response scheme
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null |
| payload | string | response data |

####example
```
  error: null,
  payload: `{"id":1,"name":"Foo","status":"new"}`,
```

## Error types
value           | Description  |
-------------:| -----:|
1000 | Log in failed - password or email not found |
1002 | User id not found |
1003 | Wrong picture format |
1004 | Email is already exist |

##User gender types
key           | value  |
-------------:| -----:|
0 | "female" |
1 | "male" |
2 | "undefined" |


# API 

## sign up
```POST /users```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| body | string | request data |
| body.email | string | |
| body.firstName | string |  |
| body.lastName | string |  |
| body.password | string |  |

####example
```
{
body: 
    `{
        email: "john@gmail.com",
        firstName: "John",
        lastName: "Doe",
        password: "123456"
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null |
| id | string | unique user id |

####example
```
error: null,
id: "somwuniqeid"
```

####possible  errors
- 1000
- 1004

## sign in
```POST /auth```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| body | string | request data |
| body.email | string | |
| body.password | string |  |

####example
```
{
heasers: {},
body: 
    `{
        email: "john@gmail.com",
        password: "123456"
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | unique user id |

####example
```
error: null,
id: "somwuniqeid"
```
####possible  errors
 - 1000
 - 1001

## update sign in data
```PUT /users```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | string | request data |
| body.firstName | string | new first name|
| body.lastName | string |  new last name|
| body.password | string |  new password|

####example
```
{
    heasers: {"id": "123456"},
    body: 
    `{
        firstName: "John",
        lastName: "Doe",
        password: "123456"
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |

####example
```
error: null,
id: "somwuniqeid"
```
####possible  errors
- 1000
- 1001
- 1002

## create profile data
```POST /users/:id/profile```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | string | request data |
| body.dateOfBirth | timestamp | |
| body.gender | int |  enum|
| body.city | string | |
| body.height | float | |
| body.profession | string | |
| body.hobbies | string | |
| body.about | string |  |

####example
```
{
    heasers: {"id": "123456"},
    body: 
    `{
        dateOfBirth: "1/1/1993",
        gender: 1,
        city: "Tel-Aviv",
        height: 1.80,
        profession: "developer",
        hobbies: "run, dance, play piano",
        about: "hi this is my description"
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |

####example
```
error: null,
id: "somwuniqeid"
```

####possible  errors
- 1001
- 1002



## update profile data
```PUT /users/:id/profile```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | string | request data |
| body.dateOfBirth | timestamp | |
| body.gender | int |  enum|
| body.city | string | |
| body.height | float | |
| body.profession | string | |
| body.hobbies | string | |
| body.about | string |  |

####example
```
{
    heasers: {"id": "123456"},
    body: 
    `{
        dateOfBirth: "1/1/1993",
        gender: 1,
        city: "Tel-Aviv",
        height: 1.80,
        profession: "developer",
        hobbies: "run, dance, play piano",
        about: "hi this is my description"
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |

####example
```
error: null,
id: "somwuniqeid"
```

####possible  errors
- 1001
- 1002


## upload profile picture 
```POST /users/:id/profile-picture```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | img file | .jpg |

####example
```
{
    heasers: {"id": "123456"},
    body: "myProfilePicture.jpg" //binary object
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |

####example
```
error: null,
id: "somwuniqeid"
```

####possible  errors
- 1001
- 1002

## create preferences
```POST /users/:id/preferences```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | string | request data |
| body.fromAge | int | |
| body.toAge | int |  enum|
| body.fromHeight | float | |
| body.toHeight | float | |

####example
```
{
    heasers: {"id": "123456"},
    body: 
    `{
       fromAge: 22,
       toAge: 27,
       gender: 2,
       fromHeight: 1.60,
       toheight: 1.70
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |

####example
```
error: null,
id: "somwuniqeid"
```

####possible  errors
- 1001
- 1002

## update preferences
```PUT /users/:id/preferences```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | string | request data |
| body.fromAge | int | |
| body.toAge | int |  enum|
| body.fromHeight | float | |
| body.toHeight | float | |

####example
```
{
    heasers: {"id": "123456"},
    body: 
    `{
       fromAge: 22,
       toAge: 27,
       gender: 2,
       fromHeight: 1.60,
       toheight: 1.70
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |

####example
```
error: null,
id: "somwuniqeid"
```

####possible  errors
- 1001
- 1002


## get matches by user preferences
```GET /matches```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | string | request data |

####example
```
{
    heasers: {"id": "123456"},
    body:`{}`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |
| users | [] | array of user objects |
| user | {} | object element |
| user.id | string |  |
| user.firstName | string |  |
| user.lastName | string |  |
| user.dateOfBirth | string |  |
| user.gender | int | emun |
| user.city | string |  |
| user.height | float |  |
| user.profession | string |  |
| user.hobbies | string |  |
| user.about | string |  |
| user.profilePicture | string |  |

####example
```
error: null,
id: "somwuniqeid",
users: '[
            {
                Id: "use1ID",
                firstName: "Mini",
                lastName: "Mouse",
                dateOfBirth: "1/1/1993",
                gender: 1,
                city: "Telv-Aviv",
                height: 1.64,
                profession: "teacher",
                hobbies: "dace, run",
                about: "about me",
                profilePicture: "use1.jpg"}, 
        },
        ...
        ]'
```

####possible  errors
- 1001
- 1002


## get search results
```GET /search```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| query | string | query params |
| query.name | string | |
| query.fromAge | int | |
| query.toAge | int | |
| query.gender | int | enum |
| query.fromHeight | float | |
| query.toHeight | float | |
| query.city | string | |

####example
```
{
    heasers: {"id": "123456"},
    body:
    `{
    name: "Miki Mouse",
    fromAge: 23,
    toAge:30,
    gender:2,
    fromHeight: "",
    toHeight:"",
    city: "Hadera", 
    img: "img.jpg"
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |
| users | [] | array of user objects |
| user | {} | object element |
| user.id | string |  |
| user.firstName | string |  |
| user.lastName | string |  |
| user.dateOfBirth | string |  |
| user.gender | int | emun |
| user.city | string |  |
| user.height | float |  |
| user.profession | string |  |
| user.hobbies | string |  |
| user.about | string |  |
| user.profilePicture | string |  |

####example
```
error: null,
id: "somwuniqeid",
users: '[
            {
                Id: "use1ID",
                firstName: "Mini",
                lastName: "Mouse",
                dateOfBirth: "1/1/1993",
                gender: 1,
                city: "Telv-Aviv",
                height: 1.64,
                profession: "teacher",
                hobbies: "dace, run",
                about: "about me",
                profilePicture: "use1.jpg"}, 
        },
        ...
        ]'
```

####possible  errors
- 1001
- 1002


## get user profile 
```GET /users/:id/profile```

####request parameters
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| headers | {} |  |
| headers.id | string | current user id |
| body | string | request data |
| body.id | string | requested user id |

####example
```
{
    heasers: {"id": "123456"},
    body:
    `{
    id: "userId"
    }`
}
```

####response
| key        | value           | Description  |
| ------------- |:-------------:| -----:|
| error      | {} | error status/null | 
| id | string | current user id |
| user | {} | object element |
| user.id | string |  |
| user.firstName | string |  |
| user.lastName | string |  |
| user.dateOfBirth | string |  |
| user.gender | int | emun |
| user.city | string |  |
| user.height | float |  |
| user.profession | string |  |
| user.hobbies | string |  |
| user.about | string |  |
| user.profilePicture | string |  |

####example
```
error: null,
id: "somwuniqeid",
users: '{
            Id: "use1ID",
            firstName: "Mini",
            lastName: "Mouse",
            dateOfBirth: "1/1/1993",
            gender: 1,
            city: "Telv-Aviv",
            height: 1.64,
            rofession: "teacher",
            hobbies: "dace, run",
            about: "about me",
            profilePicture: "use1.jpg" 
       }'
```

####possible  errors
- 1001
- 1002