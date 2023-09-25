import { loginWithEmailPassword, logoutFirebase } from "@/firebase"
import { checkingCredentials, logout, login, authenticate } from "./authSlice"
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() )
    }
}

export const auth = () => {
    return async (dispatch) => {
        dispatch (authenticate())
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        //CHEQUEAR USUARIO POR MEDIO DE AUTHENTICATOR

        const resp = await loginWithEmailPassword({ email, password });

        if(!resp.ok) return dispatch( logout(resp.errorMessage) );

        //CHEQUEAR ROL

        const docSnap = await getDoc( doc(db, "users", resp.uid) );
        
        if(docSnap.exists()){

            if(docSnap.data().role.admin){

                for(var keyName in docSnap.data().role){
                    resp.role = keyName
                }

                resp.displayName = docSnap.data().displayName

                dispatch( login(resp) );
                
            }
        } else {
            dispatch( logout(resp.errorMessage) );
        }

    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFirebase
        dispatch( logout() )
    }
}