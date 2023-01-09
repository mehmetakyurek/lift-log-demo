import gql from "graphql-tag";
import { client } from "../pages/_apollo";

export type Log = {
    id: string,
    user: string,
    set: number,
    rep: number,
    weight: number,
    rpe: number
}

export const init: Log = {
    id: "",
    user: "",
    set: 5,
    rep: 5,
    weight: 50,
    rpe: 8
}

export const LogReducer = (state: Log, action: { payload: Partial<Log> }) => {
    if (Object.keys(action.payload).length > 0 &&
        (Object.keys(action.payload) as Array<keyof typeof action["payload"]>).every((val) => state[val] !== action.payload[val])) {
        state = {
            ...state,
            ...action.payload
        }
        updateLog({ user: state.user, id: state.id, ...action.payload });
    }
    return state;
}

function updateLog(log: Partial<Log>) {
    client.mutate({
        mutation: gql`
        mutation update($user: ID!, $id: ID!, $weight: Float, $set: Int, $rep: Int, $rpe: Float){
            updateLog(user: $user, exercise: $id, weight: $weight, set: $set, rep: $rep, rpe: $rpe)
        }
        `,
        variables: { ...log }
    }).then(() => {
        
    }).catch(console.log)
}