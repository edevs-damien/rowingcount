import {renderLogin} from "./index";
import {km} from "date-fns/locale";
import {doesSectionFormatHaveLeadingZeros} from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

const auth = `Bearer fnAFHCwaZ1AAzXtVOGJ_puy0bfpwsh4NZbiyS0r-`
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
    return data.userByName.data[0]
}

export async function getTrainingByUser(name) {
    const data = await dbQuery(`query getTrainingByUser { userByName(name: "${name}") { data { Trainings { data { _id km boat date rowers { data { _id name km nbt  } } } } } } }`)
    if(data.userByName.data[0].Trainings=== undefined) return false

    return data.userByName.data[0].Trainings.data
}

export async function getAllTraining() {
    const data = await dbQuery(`{ allTraining { data { _id km boat date rowers { data { _id name km nbt } } } } }`)
    if(data.allTraining.data=== undefined) return false
    return data.allTraining.data
}

export async function createTrainig(km, boat, date, rowers) {

    const IdList = [];
    const IdList2 = [];
    const KmList = [];
    const nbtList = [];
    let i = 0;
    let ik = 0;



    const next = async function (){
      dbQuery(`query getUserId { userByName(name: "${rowers[i]}") { data { _id km nbt } } }`).then(async (data) => {
          if(data.userByName.data[0]._id=== undefined) return false
          IdList.push('"' + data.userByName.data[0]._id + '"')
          IdList2.push(data.userByName.data[0]._id)
          KmList.push(data.userByName.data[0].km)
          nbtList.push(data.userByName.data[0].nbt)
              i++;
              if (rowers.length === IdList.length) {
                 return await kmFetch()
              } else next()


      })
    }

    const kmFetch = async function () {

        dbQuery(`mutation changeKm { updateUser(id: "${IdList2[ik]}", data: { km: ${KmList[ik] + km} nbt: ${nbtList[ik] + 1} }) {_id}  }`).then(async () => {
            ik++
            if (ik === IdList.length) {
                return await finalFetch()
            } else kmFetch()
        })

    }


    const finalFetch = async function () {

        const Ids = IdList.join(",");
        const req = await dbQuery(`mutation createTraining { createTraining(data: { km : ${km} date: "${date.toLocaleDateString("fr").replaceAll("/", ".")}" rowers : { connect : [ ${Ids} ] } boat : "${boat}" }) { _id } }`)
        return req.createTraining._id !== undefined;

    }


     await next()

}

export async function resetKm(name) {

        var id
        dbQuery(`query getUserId { userByName(name: "${name}") { data { _id} } }`).then(async data => {
            
            id = data.userByName.data[0]._id


            await next()

        })

        const next = async () => {
            await dbQuery(`mutation changeKm { updateUser(id: "${id}", data: { km: 0 nbt: 0 last: "${new Date().toLocaleDateString('en-GB').toString().replaceAll("/", ".")}" }) {_id}  }`)
        }
}

export async function deleteUser(name) {
    var id
    dbQuery(`query getUserId { userByName(name: "${name}") { data { _id} } }`).then(async data => {
        
        id = data.userByName.data[0]._id


        await next()

    })

    const next = async () => {
        await dbQuery(`mutation changeKm { deleteUser(id: "${id}") {_id} }`)
    }


}

export async function deleteTraining(data) {

    console.log(data)
    let IdList = []
    const next = async () => {
        await dbQuery(`mutation changeTraining { updateTraining(id: "${data._id}", data: { rowers: { disconnect : [ ${IdList.join(", ")} ] } }) {_id}}`)
        await next2()
    }

    const next2 = async () => {
        await dbQuery(`mutation changeTraining { deleteTraining(id: "${data._id}") {_id} }`)
        await next3()
    }

    const next3 = async () => {

        data.rowers.data.forEach((du) => {


           if(du.nbt === 0) {
               alert("Error : Veuillez réinitialiser vos résultats pour pouvoir les mettre a jour")
               return
           }

           if(du.km < data.km) {
               alert("Error : Veuillez réinitialiser vos résultats pour pouvoir les mettre a jour")
               return;
           }

            dbQuery(`mutation changeKm { updateUser(id: "${du._id}", data: { km: ${du.km - data.km} nbt: ${du.nbt - 1} }) {_id}  }`)
        })


    }

   data.rowers.data.forEach((d) => {
       IdList.push('"' + d._id + '"')
   })
    await next()





}

export async function createUser(name) {


    console.log("name")

    dbQuery(`query getUserId { userByName(name: "${name}") { data { _id} } }`).then(async (a) => {
        
        console.log(a)
        if(a.userByName.data[0] !== undefined) {
            alert("Error : User already exists")
            return
        } else {

            await next()
        }


    })

    const next = async () => {
        await dbQuery(`mutation createUser { createUser(data: { nbt: 0 km: 0 last: "${new Date().toLocaleDateString('en-GB').toString().replaceAll("/", ".")}" name: "${name}" admin : false }) { _id } }`)
    }
}

export function getUserName() {
    return getCookie("name")
}

export function login(name) {
    setCookie("name", name, 90)
}


export function logout() {
    setCookie("name", "", 1)
    renderLogin("logout");
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}






