# `contest.html`'s theory of operation

The contest.html page was a static page and it was not easy to insert new problems to the contest. Now, the function getUrlPromise in contest.js gathers the json file at /api/contest. All informations about the contest are stored in the JSON file that are dynamically served by the API endpoint.

## Example:

```json
{
  "name":"Contest di prova viking-ETHYL-diam",
  "end_date":"2018-03-13T14:33:40.158Z",
  "tasks":[
    {
      "name":"noccioline",
      "full_name":"Secchi di noccioline",
      "score":100
    },
    {
      "name":"magneti",
      "full_name":"Allineamento magnetico",
      "score":85
    },
    {
      "name":"taxi",
      "full_name":"Viaggi in taxi",
      "score":60
    },
    {
      "name":"gravity",
      "full_name":"Assenza di gravità",
      "score":100
    },
    {
      "name":"canoa",
      "full_name":"Canottaggio",
      "score":10
    },
    {
      "name":"fuga",
      "full_name":"Fuga dagli inseguitori",
      "score":5
    },
    {
      "name":"annoluce",
      "full_name":"Anno luce",
      "score":100
    }
  ]
}
```

The idea is that the JSON file is created by the contest create setup, and possibly changeable in some way.

The same approach is used for notifications. (/api/alerts)

Relative routes have been created in api.js
