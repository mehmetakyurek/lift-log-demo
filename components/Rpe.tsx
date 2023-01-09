import { FC, useEffect, useState } from "react";
import { HoverBox } from "./HoverBox";
import { LogDispatch, oneto } from "./Log";
import { Log } from "./reducer";


export const Rpe: FC<{ rpe: number, dispatch: LogDispatch }> = props => {
    const [input, setInput] = useState(props.rpe);
    //useEffect(() => setInput(props.log.rpe), [props.log.rpe]);    
    useEffect(() => {
        props.dispatch({ payload: { rpe: input } })
    }, [input, props.dispatch])
    return <div className="group relative">
        <input className="input" type="number" value={input} onChange={e => setInput(Number(e.target.value))} />
        <HoverBox className="w-max left-full top-2/4 -translate-y-2/4">
            <div className="grid grid-cols-2">
                {oneto(10).map(e => <>
                    <div onClick={() => setInput(e)} className="hover:bg-secondary py-1 px-2 rounded cursor-pointer">{e}</div>
                    {e !== 10 && <div onClick={() => setInput(e + .5)} className="hover:bg-secondary py-1 px-2 rounded cursor-pointer">.5</div>}
                </>)}
            </div>
        </HoverBox>
    </div>
}