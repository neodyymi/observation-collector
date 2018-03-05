# Observation collector
Reaktor 2018 summer - ennakkotehtävä

## Architecture
* Backend running on aws dynamodb and lambdas
* Frontend running on React

## Example
* website: 
  * http://reaktor2018summer.s3-website-eu-west-1.amazonaws.com/

* api:
  * https://7jh42r9fj0.execute-api.eu-west-1.amazonaws.com/beta/location/
  * https://7jh42r9fj0.execute-api.eu-west-1.amazonaws.com/beta/observation/

```
  /
    /location (GET, POST, DELETE)
      /location/batch (POST)
      /location/{id} (DELETE)
        /location/{id}/observations (GET)
    /observation (GET, POST, DELETE)
      /observation/batch (POST)
      /observation/{id} (GET, DELETE)
```


## Author
* Ville-Veikko Saari - [neodyymi](https://github.com/neodyymi)