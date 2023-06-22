const auth = "Bearer fnAFHCwaZ1AAzXtVOGJ_puy0bfpwsh4NZbiyS0r-"
export async function dbQuery(query) {
    const req = await fetch('https://graphql.eu.fauna.com/graphql', {
        method: 'POST',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Connection': 'keep-alive',
            'DNT': '1',
            'Origin': 'https://dashboard.fauna.com',
            'authorization': auth
        },
        body: JSON.stringify({
            'query': query
        })
    })
    const data = await req.json()
    return data.data

}



export async function getAllUser() {
    const data = await dbQuery(`{ allUser { data { _id name km nbt admin last } } }`)
    if(data.allUser.data === undefined) return false
    return data.allUser.data
}

export async function getUserByName(name) {
    const data = await dbQuery(`query getUserbyName { userByName(name: "${name}") { data { _id name km nbt admin last } } }`)
    if(data.userByName.data === undefined) return false
    return data.userByName.data
}


export async function getTrainingByUser(name) {
    const data = await dbQuery(`query getTrainingByUser { userByName(name: "${name}") { data { Trainings { data { _id km boat date rowers { data { _id name } } } } } } }`)
    if(data.userByName.data.Trainings=== undefined) return false
    return data.userByName.data.Trainings
}

export async function getAllTraining() {
    const data = await dbQuery(`{ allTraining { data { _id km boat date rowers { data { _id name } } } } }`)
    if(data.allTraining.data=== undefined) return false
    return data.allTraining.data
}


export async function createTrainig(km, boat, date, rowers) {

    const IdList = [];
    let i = 0;


    const next = async function (){
      dbQuery(`query getUserId { userByName(name: "${rowers[i]}") { data { _id km nbt } } }`).then(async (data) => {
          if(data.userByName.data[0]._id=== undefined) return false
          IdList.push('"' + data.userByName.data[0]._id + '"')
          dbQuery(`mutation changeKm { updateUser(id: "${data.userByName.data[0]._id}", data: { km: ${data.userByName.data[0].km + km} nbt: ${data.userByName.data[0].nbt + 1} }) }`).then(async d => {
              i++;
              if (rowers.length === IdList.length) {
                  await finalFetch()
              } else next()
          })

      })
    }

    const finalFetch = async function () {

        var Ids = IdList.join(",")
        const req = await dbQuery(`mutation createTraining { createTraining(data: { km : ${km} date: "${date.toString().replaceAll("/", ".")}" rowers : { connect : [ ${Ids} ] } boat : "${boat}" }) { _id } }`)
        return req.createTraining._id !== undefined;

    }


   await next()

}




export async function resetKm(name) {

        dbQuery(`query getUserId { userByName(name: "${name}") { data { _id km nbt } } }`).then(data => {
            const id = data.userByName.data._id
            if(data.userByName.data._id=== undefined) return false

            dbQuery(`mutation changeKm { updateUser(id: "${id}", data: { km: 0 nbt: 0 last: "${new Date().toLocaleDateString('en-GB').toString().replaceAll("/", ".")}" }) {_id}  }`)

        })
}


export async function deleteUser(name) {

    dbQuery(`query getUserId { userByName(name: "${name}") { data { _id km nbt } } }`).then(data => {
        const id = data.userByName.data._id
        if(data.userByName.data._id=== undefined) return false

        dbQuery(`mutation changeKm { deleteUser(id: "${id}") {_id} }`)

    })
}



export async function createUser(name) {

    dbQuery(`query getUserId { userByName(name: "${name}") { data { _id km nbt } } }`).then(data => {
        const id = data.userByName.data._id
        if(data.userByName.data._id=== undefined) return false

        dbQuery(`mutation createUser { createUser(data: { nbt: 0 km: 0 last: "${new Date().toLocaleDateString('en-GB').toString().replaceAll("/", ".")}" name: "${name}" admin : false }) { _id } }`)

    })
}


