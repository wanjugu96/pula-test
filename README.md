# [Pula Software Quality Control Challenge](https://github.com/wanjugu96/pula-test.git)
## Technologies
### Back-end
The data is served on *Heroku* using *Hasura* (*GraphQL*) on *PostgreSQL* [here](https://farmer-data.herokuapp.com/).
An extra API layer is built on *NextJS* that refers to the GraphQL endpoint provided by Hasura using *Apollo*.
To start the Next server locally, go to the root of the cloned project and run `npm install`, then `npm run dev` from a terminal.
### Front-end (Testing)
Testing is carried out on *Postman* and the API collection is provided on the root folder of this project &mdash; **Pula Data.postman_collection.json**.

## Part One
- The database stores area data, farmer data and harvest data. 
- Come up with a minimum of 5 scenarios to validate that the built API captures relevant data and meets quality standards:
- -The average rainfall need to a value between 150-200
- -The maximum value for the average temperature should be 45
- -All the individual table variabkes need to be non-null values
        


## Part Two
- JSON payload example:
  ```json
    POST /api/area HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json

    {
        "average_rainfall":178,
        "average_temperature":32,
        "average_historical_yield":0.12648281866129452,
        "prior_yield":0.5603589464253178,
        "zone":"71dj37vilga"
    }```

- pre request script to generate  datasets:

```javascript
const {url} = pm.request;
const link = `${url.protocol}://${url.host[0]}${url.port ? ":" + url.port : ""}`;

pm.sendRequest(`${link}/api/area`, function (err, res) {        
            const {payload:{areas}} = res.json()
            
            const farmer_generator = function* async () {
                while(true) {
                    if(Math.random()>0.9){
                        return;
                    }
                    yield {
                        area_id: areas[Math.floor(Math.random() * areas.length)].id,
                        name: Math.random().toString(36).substring(2)
                    }
                }
            }
        let body = [];

        for (const farmer of farmer_generator()) {
            body.push(farmer)
        }
        
        pm.environment.set("data", JSON.stringify({objects: body}));
});
```
-performance test script:
```javascript
pm.sendRequest({url: pm.request.url, method: pm.request.method, body: pm.request.body}, function (err, res) {
        pm.test("Response time is " + res.responseTime, function (){
        pm.expect(err).to.equal(null);
        pm.expect(res).to.have.property('code', 200);
        });
    }); 
    ```
  - Performance tests in Postman collection. Metrics used is the response time.


## Part Three
- Clearing data is the last request in the Postman collection. The SQL query is the request body.

```json
{
    "type": "run_sql",
    "args": {
        "sql": "TRUNCATE harvests, farmers, areas CASCADE;"
    }
}
```
