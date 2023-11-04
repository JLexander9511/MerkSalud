import { FirebaseApp, FirebaseAuth, registerUserWithEmailPassword } from "@/firebase"
import { startProcess, setIdle, processFinishedUnsuccessfully, processFinishedSuccessfully, setQuerying, fillRequests, queryDone, emailSending, emailSent, fillUsers, fillCards, fillDailyOp, emailNotSent, fillpPayments } from "./appSlice"
import { getFirestore, doc, getDoc, setDoc, getDocs, collection, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { customAlphabet, nanoid } from 'nanoid'
import { signInWithEmailAndPassword } from "firebase/auth";
import formatDate from "@/helpers/formatDate";

const db = getFirestore();

//CAMBIOS DE ESTADO

export const initProcess = () => {
    return async (dispatch) => {
        dispatch( startProcess() )
    }
}//THUNK MAQUETA
export const startQueryingData = () => {
    return async (dispatch) => {
        dispatch(setQuerying())
    }
} //THUNK MAQUETA

export const goIdle = () => {
    return async (dispatch) => {
        dispatch( setIdle () )
    }
}

//PROCESAR SOLICITUD EN LA PAGINA WEB

export const getRefererData = async (refNumber) => {
    const docRef = doc(db, "users", refNumber)
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        return {refName: docSnap.data().displayName, refType: docSnap.data().card.type}
    } else {
        return null
    }
}

const sendEmail = async (userEmail, userName) => {
    const res = await fetch('/api/requestReceivedEmail',{
      body: JSON.stringify({
        userEmail,
        userName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    return await res.json()
}

export const processRequest = (data) => {
    return async (dispatch) => {
        
        dispatch( startProcess() );
        
        const id = nanoid(10);
        let refObject = {}
        if(data.refNumber){
            if(!await getRefererData(data.refNumber)){
                data.refNumber = null
            } else {
                const {refName, refType} = await getRefererData(data.refNumber)
                refObject = { refUid: data.refNumber, refName, refType }
            } 
        }

        try {
            await setDoc(doc(db, "requests", id), {
                id,
                displayName: `${data.nombre} ${data.apellido}`,
                email: data.email,
                cedula: data.cedula,
                phone: data.telefono,
                bank: data.banco,
                refTransaction: data.refTransaction,
                refData: (data.refNumber) ? refObject : null,
                status: 'pending',
                date: data.fecha,
                type: data.type
            })

            //ENVIAR CORREO A NUEVO USUARIO 

            dispatch( emailSending() )
            const userName = `${data.nombre} ${data.apellido}`;
            const newRequestEmail = await sendEmail(data.email, userName)

            if(!newRequestEmail.ok) {
                dispatch( emailNotSent() )
            }
        
            dispatch( emailSent() )
        
            dispatch( processFinishedSuccessfully('Su solicitud ha sido procesada exitosamente') );

        } catch (error) {
            console.log(error)
            dispatch(processFinishedUnsuccessfully(error.message) )

        }
        
    }
}


//OBTENER TODOS LAS SOLICITUDES

export const getUserRequests = () => {
    return async (dispatch) => {

            dispatch(setQuerying())

            try {

                const requestRef = collection(db, "requests");
                const query = await getDocs(requestRef)

                let requests = [];

                query.forEach((doc) => {
                    requests.push({ ...doc.data() });
                })

                dispatch(fillRequests(requests))

            dispatch(queryDone())

            } catch (error) {

                dispatch(processFinishedUnsuccessfully(error.message))

            }
    }
}

//ACTUALIZAR DOCUMENTOS

export const updateDocument = (id, updatableData) => {
    return async (dispatch) => {
        
        dispatch( startProcess() )

        try {

            const updatableDoc = doc(db, "requests", id);

            await updateDoc(updatableDoc, updatableData);

            const requestRef = collection(db, "requests");
                const query = await getDocs(requestRef)

                let requests = [];

                query.forEach((doc) => {
                    requests.push({ ...doc.data() });
                })

            dispatch(fillRequests(requests))

            dispatch(processFinishedSuccessfully())

        } catch (error) {
            dispatch(processFinishedUnsuccessfully(error.message))
        }
    }
}

//ELIMINAR DOCUMENTO

export const deleteDocument = (id) => {
    return async (dispatch) => {
        dispatch( startProcess() )

        try {

            await deleteDoc(doc(db, "requests", id));

            const requestRef = collection(db, "requests");
                const query = await getDocs(requestRef)

                let requests = [];

                query.forEach((doc) => {
                    requests.push({ ...doc.data() });
                })

            dispatch(fillRequests(requests))

            dispatch(processFinishedSuccessfully())

        } catch (error) {
            dispatch(processFinishedUnsuccessfully(error.message))
        }
    }
}

//AGREGAR UN USUARIO

async function addUserInUsersCollection(data, serial, id) {
    try {
        await setDoc(doc(db, "users", id), {
            id,
            displayName: data.displayName,
            email: data.email,
            cedula: data.cedula,
            phone: data.phone,
            role: {user: true},
            referer: (!data.refData) ? null : {uid: data.refData.refUid, refname: data.refData.refName, type: data.refData.refType},
            referrals: [],
            refLink: `merksalud.com/payments?ref=${id}`,
            regDate: data.date,
            card: {
                serial: serial,
                createDate: data.date,
                expireDate: (data.type == 'premium') ? '01/01/2099' : data.expirationDate,
                type: data.type
             },
            status: 'active',
            description: data.description || 'Usuario regular',
            userType: data.userType || 'regular'
          });
    } catch (error) {
        return error
    }
    
}

async function addCardInCardsCollection(data, serial, id) {
    try {
        await setDoc(doc(db, "cards", serial), {
            serial,
            createDate: data.date,
            expireDate: (data.type == 'premium') ? '01/01/2099' : data.expirationDate,
            type: data.type,
            relatedUid: id,
            cardOwner: data.displayName
          });
    } catch (error) {
        return error
    }
}

async function addReferralToUsersCollection(data, id) {
    try {
        if(data.refData) {
                const updatableDoc = doc(db, "users", data.refData.refUid);
                const getupdatableDoc = await getDoc( updatableDoc );
    
                if(!getupdatableDoc.exists) return new Error('Ocurrio un error actualizando referidos a referente')
                
                await updateDoc(updatableDoc, {
                    referrals: arrayUnion({
                        uid: id, 
                        refName: data.displayName,
                        type: data.type,
                        refDate: data.date})
                });

            }
    } catch (error) {
        return error
    }
}

async function addReferralToWeeklyCollection(data, id, paymentId) {
    try {

        if(data.refData){
            const docSnap = await getDoc( doc(db, "weeklyReferralAccount", data.refData.refUid) );
            if(docSnap.exists()){
                await updateDoc(doc(db, "weeklyReferralAccount", data.refData.refUid), {
                    referralList: arrayUnion({
                        uid: id, 
                        refName: data.displayName,
                        type: data.type,
                        commisionAmount: (data.refData.refType != 'premium') ? (data.type == 'green') ? 10*0.2 : (data.type == 'blue') ? 60*0.2 : (data.type == 'black') ? 70*0.2 : 100*0.2 : (data.type == 'green') ? 10*0.3 : (data.type == 'blue') ? 60*0.3 : (data.type == 'black') ? 70*0.3 : 100*0.3
                    })
                })    
                } else {
                    await setDoc(doc(db, "weeklyReferralAccount", data.refData.refUid), {
                        paymentId: paymentId,
                        referralList: [{
                            uid: id, 
                            refName: data.displayName,
                            type: data.type,
                            commisionAmount: (data.refData.refType != 'premium') ? (data.type == 'green') ? 10*0.2 : (data.type == 'blue') ? 60*0.2 : (data.type == 'black') ? 70*0.2 : 100*0.2 : (data.type == 'green') ? 10*0.3 : (data.type == 'blue') ? 60*0.3 : (data.type == 'black') ? 70*0.3 : 100*0.3
                        }]
                    });
                }                      
            }

    } catch (error) {
        return error
    }
}

async function addBonusToWeeklyCollection(data, id, secondPaymentId) {
    try {
        if(data.refData) {
            const docSnap = await getDoc( doc(db, "users", data.refData.refUid) );
            if(docSnap.exists()){
                if(docSnap.data().referer.type == 'premium') {
                    const premiumCheck = await getDoc( doc(db, "weeklyReferralAccount", docSnap.data().referer.uid) );
                    if(premiumCheck.exists()){
                        await updateDoc(doc(db, "weeklyReferralAccount", docSnap.data().referer.uid), {
                        bonusList: arrayUnion({
                            uid: id, 
                            refName: data.displayName,
                            type: data.type,
                            commisionAmount: (data.type == 'green') ? 10*0.1 : (data.type == 'blue') ? 60*0.1 : (data.type == 'black') ? 70*0.1 : 100*0.1
                        })
                    })
                    } else {
                        await setDoc(doc(db, "weeklyReferralAccount", docSnap.data().referer.uid), {
                            paymentId: secondPaymentId,
                            bonusList: [{
                                uid: id, 
                                refName: data.displayName,
                                type: data.type,
                                commisionAmount: (data.type == 'green') ? 10*0.1 : (data.type == 'blue') ? 60*0.1 : (data.type == 'black') ? 70*0.1 : 100*0.1
                            }]
                        });
                    }
                    
                }
                
            } 
        }
    } catch (error) {
        return error
    }
}

async function addPaymentToDailyPaymentCollection(data, id) {
    try {
        await updateDoc(doc(db, "processedPayments", 'dailyProcessedPayments'), {
            operations: arrayUnion({
                id: data.id || id, 
                clientName: data.displayName,
                bank: data.bank,
                transactionReference: data.refTransaction,
                type: data.type,
                date: data.date,
                ammount: (data.type == 'green') ? 10 : (data.type == 'blue') ? 60 : (data.type == 'black') ? 70 : 100
            })
        })
    } catch (error) {
        return error
    }
}

async function deleteRequest(id){
    if(!id){
        return null
    }else{
        try {
            await deleteDoc(doc(db, "requests", id));
        } catch (error) {
            return error
        }
    }

}

export const addRegularUser = (data) => {
    return async (dispatch) => {

        dispatch( startProcess() )
        const nanoSerial = customAlphabet('1234567890', 16)
        const nanoPayment = customAlphabet('1234567890abcdefghijkmnopqrstuvwxqz', 10)
        const nanoOptPayment = customAlphabet('1234567890abcdefghijkmnopqrstuvwxqz', 10)
        const nanoId = customAlphabet('1234567890AbBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz-_', 28)
        const nanoPwd = customAlphabet('1234567890AbBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz-_', 8)
        const serial = nanoSerial()
        const id = nanoId()
        const psswd = nanoPwd()
        const paymentId = nanoPayment()
        const secondPaymentId = nanoOptPayment()

        try {
            //AÑADIR USUARIO A REGISTRO USUARIOS

            addUserInUsersCollection(data, serial, id);  

            //REGISTRO TARJETA

            addCardInCardsCollection(data, serial, id);

            //Anotar el referido a su respectivo referente en su documento

            addReferralToUsersCollection(data, id)
            
            //Acotar el referido y añadirlo a su cuenta mensual de referidos
            
            addReferralToWeeklyCollection(data, id, paymentId)

            //Si referido base es premium agregar bono 

            addBonusToWeeklyCollection(data, id, secondPaymentId)

            //Anotar el pago como procesado a la coleccion de pagos diaria

            addPaymentToDailyPaymentCollection(data, id)

            //REGISTRO de usuario en AUTHENTICATION

            const registerOnAuthUser = registerUserWithEmailPassword({displayName: data.displayName, email: data.email, password: psswd})

            if(!(await registerOnAuthUser).ok) {throw new Error('Ocurrio un error')}
            
            await signInWithEmailAndPassword(FirebaseAuth, 'japl.uba.1995@gmail.com', 'Access1110');


            //ELIMINAR SOLICITUD AL SER EXITOSA
            
            deleteRequest(data.id)
            
            dispatch(processFinishedSuccessfully())    
            

        } catch (error) {
            console.log(error.message)
            dispatch(processFinishedUnsuccessfully(error.message))
        }
    }
}

//OBTENER TODOS LOS USUARIOS

export const getAllUsers = () => {
    return async (dispatch) => {

            dispatch(setQuerying())

            try {

                const query = await getDocs(collection(db, "users"))

                let users = [];

                query.forEach((doc) => {
                    if(doc.data().role.admin) return
                    users.push({ ...doc.data() });
                })

                dispatch(fillUsers(users))

            dispatch(queryDone())

            } catch (error) {

                dispatch(processFinishedUnsuccessfully(error.message))

            }
    }
}

//OBTENER TODAS LAS TARJETAS

export const getAllCards = () => {
    return async (dispatch) => {

            dispatch(setQuerying())

            try {

                const query = await getDocs(collection(db, "cards"))

                let cards = [];

                query.forEach((doc) => {
                    cards.push({ ...doc.data() });
                })

                dispatch(fillCards(cards))

            dispatch(queryDone())

            } catch (error) {

                dispatch(processFinishedUnsuccessfully(error.message))

            }
    }
}

//DESACTIVAR TARJETA

export const destroyCard = (id, serial) => {
    return async (dispatch) => {
        dispatch( startProcess() )

        try {
            const docSnap = await getDoc( doc(db, "users", id) );

            if(docSnap.exists()){
                await updateDoc( doc(db, "users", id), {
                    status: 'inactive',
                    card: {...docSnap.data().card, status: 'inactive'}
                });
            } 
            
            await updateDoc( doc(db, "cards", serial), {
                status: 'inactive',
            });

            dispatch(setQuerying())

            const query = await getDocs(collection(db, "cards"))

                let cards = [];

                query.forEach((doc) => {
                    cards.push({ ...doc.data() });
                })

            dispatch(fillCards(cards))

            dispatch(queryDone())

            dispatch(processFinishedSuccessfully())

        } catch (error) {
            console.log(error.message)
            dispatch(processFinishedUnsuccessfully(error.message))
        }
    }
}

//RENOVAR TARJETA

export const renewCard = (id, serial) => {
    return async (dispatch) => {
        dispatch( startProcess() )

        try {

            const userCardUpdate = await getDoc( doc(db, "users", id) );
            let str1 = userCardUpdate.data().card.expireDate.slice(0,6);//TENDRIA QUE SER FECHA ACTUAL
            let newDate = str1 + (Number(userCardUpdate.data().card.expireDate.slice(6))+1)

            await updateDoc( doc(db, "users", id), {
                card: { ...userCardUpdate.data().card,
                        expireDate: newDate}
            });

            await updateDoc( doc(db, "cards", serial), {
                expireDate: newDate
            });

            dispatch(processFinishedSuccessfully())

        } catch (error) {
            console.log(error.message)
            dispatch(processFinishedUnsuccessfully(error.message))
        }
    }
}

//ACTUALIZAR TARJETA

export const updateCard = (id, serial, newType) => {
    return async (dispatch) => {
        dispatch( startProcess() )

        try {

            const userCardUpdate = await getDoc( doc(db, "users", id) );

            await updateDoc( doc(db, "users", id), {
                card: { ...userCardUpdate.data().card,
                        type: newType}
            });

            await updateDoc( doc(db, "cards", serial), {
                type: newType
            });

            dispatch(processFinishedSuccessfully())

        } catch (error) {
            console.log(error.message)
            dispatch(processFinishedUnsuccessfully(error.message))
        }
    }
}

//OBTENER OPERACIONES DIARIAS

export const getDailyOp = () => {
    return async (dispatch) => {

            dispatch(setQuerying())

            try {

                const query = await getDoc( doc(db, 'processedPayments', 'dailyProcessedPayments') );
                let op = [];
                query.data().operations.forEach( operation => {
                    op.push(operation)
                })

                dispatch(fillDailyOp(op))

            dispatch(queryDone())

            } catch (error) {

                dispatch(processFinishedUnsuccessfully(error.message))

            }
    }
}


//REALIZAR CORTE SEMANAL

export const makeWeeklyAccountReport = (ops) => {
    return async (dispatch) => {
        dispatch( startProcess() )
        try {
            let docIds = [], paymentData = [];
            
            const docs = await getDocs(collection(db, "weeklyReferralAccount"))
            
            docs.forEach((doc) => {
                docIds.push(doc.id)
                paymentData.push(doc.data())
            })
            
            docIds.forEach(async (document) => {
                await deleteDoc(doc(db, "weeklyReferralAccount", document));
            })
            
            await setDoc(doc(db, "processedPayments", 'weeklyProcessedPayments'), {
                [`semana-${formatDate(new Date())}`]: ops
            })
            
            await updateDoc( doc(db, "processedPayments", 'dailyProcessedPayments'), {
                operations: []
            });
            
            paymentData.forEach(async (pay) => {
                await setDoc(doc(db, "pendingPayments", pay.paymentId), {
                    pendingPayments: pay.referralList,
                    paymentId: pay.paymentId
                    //AQUI VAN TAMBIEN EL MEDIO DE PAGO DEL USUARIO
                })
            })
        
            dispatch(processFinishedSuccessfully())
        } catch (error) {
            console.log(error.message)
            dispatch(processFinishedUnsuccessfully(error.message))
        }
    }
}

//OBTENER TODOS LOS PAGOS PENDIENTES

export const getPendingPayments = () => {
    return async (dispatch) => {

            dispatch(setQuerying())

            try {
                const query = await getDocs(collection(db, "pendingPayments"))
                let payments = [];
                query.forEach( data => {
                    payments.push(data.data())
                })
                dispatch(fillpPayments(payments))

            dispatch(queryDone())

            } catch (error) {

                dispatch(processFinishedUnsuccessfully(error.message))

            }
    }
}