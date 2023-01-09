import { gql, useQuery } from "@apollo/client";
import { Dispatch, FC, ReactNode, useReducer, useState } from "react";
import { init, Log, LogReducer } from "./reducer";
import { Rpe } from "./Rpe";
import { SetRep } from "./SetRep";
import { Weight } from "./Weight";

const query = gql`
query GetLogs($id: ID){
    logs(user: $id) {
        exercise {
            _id
            name
        }
        weight
        set
        rep
        rpe
    }
}
`
export type LogDispatch = Dispatch<Parameters<typeof LogReducer>["1"]>

const Log: FC<{ userId: string }> = (props) => {
    const logs = useQuery<{ logs: Array<Partial<Log> & { exercise: { _id: string, name: string } }> }>(query, { variables: { id: props.userId } });
    const { data, loading } = useQuery<{ exercises: [{ _id: string, name: string }] }>(gql`{exercises{ _id, name}}`)
    return <div className="flex justify-center items-center h-full bg-primary font-nunito">
        <div className="p-6 bg-secondary rounded-md text-text flex gap-y-3 flex-col">
            {(loading || logs.loading) ? <span>Loading</span> :
                data?.exercises.map(e => <ExerciseRow user={props.userId} {...e} key={e._id} {...logs.data?.logs.find(f => f.exercise._id === e._id)} />)
            }
        </div>
    </div>
}
const ExerciseRow: FC<{ _id: string, user: string, name: string, set?: number, rep?: number, weight?: number, rpe?: number }> = props => {
    const [log, dispatch] = useReducer(LogReducer, {
        id: props._id,
        user: props.user,
        set: props.set ?? init.set,
        rep: props.rep ?? init.rep,
        weight: props.weight ?? init.weight,
        rpe: props.rpe ?? init.rpe
    })

    return <div className="grid grid-cols-[auto_4rem_4rem_4em_4rem] gap-x-2 text-center">
        <div className="text-right">{props.name}</div>
        <SetRep set={log.set} rep={log.rep} dispatch={dispatch} />
        <Weight weight={log.weight} dispatch={dispatch} />
        <Rpe rpe={log.rpe} dispatch={dispatch} />
    </div>
}


export function oneto(number: number) {
    return Array.from({ length: number }, (_, i) => i + 1);
}
export default Log;

