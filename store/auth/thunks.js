import { FirebaseApp, loginWithEmailPassword, logoutFirebase } from "@/firebase"
import { checkingCredentials, logout, login, authenticate } from "./authSlice"
import { getFirestore, doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { goIdle, processFinishedSuccessfully, processFinishedUnsuccessfully, startProcess } from "../app";

const db = getFirestore();

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch( checkingCredentials() )
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {

        try {
            dispatch( checkingCredentials() );
            dispatch( startProcess() )

            //CHEQUEAR USUARIO POR MEDIO DE AUTHENTICATOR

        const resp = await loginWithEmailPassword({ email, password });

        if(!resp.ok) {
            dispatch( logout(resp.errorMessage) );
            dispatch( processFinishedUnsuccessfully(resp.errorMessage) )
        } 
        //CHEQUEAR ROL

        const q = query(collection(db, "users"), where("displayName", "==", resp.displayName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(doc.data().role.admin){

                        for(var keyName in doc.data().role){
                            resp.role = keyName
                        }
        
                        resp.displayName = doc.data().displayName
        
                        dispatch( processFinishedSuccessfully('Bienvenido Admin!') )
                        dispatch( login(resp) );
                        
                    } else {
                        dispatch( processFinishedUnsuccessfully('No tiene los atributos para acceder a este panel de control.') )
                        dispatch( logout('No tiene los atributos para acceder a este panel de control.') );
                    }
          });

        } catch (error) {
            dispatch( processFinishedUnsuccessfully('Ocurrio un error!') )
            dispatch( logout('Ocurrio un error!') );
        }

    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFirebase
        dispatch( logout() )
    }
}

