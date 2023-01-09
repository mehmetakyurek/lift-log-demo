import React, { FC, FocusEventHandler, useCallback, useEffect, useState } from "react"
import { HoverBox } from "./HoverBox"
import { LogDispatch, oneto } from "./Log"
import { Log } from "./reducer"

export const SetRep: FC<{ set: number, rep: number, dispatch: LogDispatch }> = props => {
    const [inputVal, setInputVal] = useState(props.set + "x" + props.rep);
    useEffect(() => {
        setInputVal(props.set + "x" + props.rep);
    },[props.set, props.rep, setInputVal])
    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback((e) => {
        const [set, rep] = inputVal.split("x").map((e, i) => {
            let n = Number(e);
            if (!isNaN(n) && n > 0 && n < 11) return n; else return i ? props.set : props.rep;
        })
        if (set && rep) props.dispatch({ payload: { set, rep } });
        else setInputVal(props.set + "x" + props.rep);
    }, [inputVal, setInputVal])
    return <div className="group relative">

        <input className="input" value={inputVal} onChange={e => setInputVal(e.target.value)} onBlur={handleBlur} />
        <HoverBox>
            <div className="flex flex-col">
                <OneToNine selected={props.set} onChange={s => { props.dispatch({ payload: { set: s } }) }} />
                <div className="text-center">x</div>
                <OneToNine selected={props.rep} onChange={s => { props.dispatch({ payload: { rep: s } }) }} />
            </div>
        </HoverBox>
    </div>
}

export const OneToNine: FC<{ selected: number, onChange: (selected: number) => void }> = props => {
    return <div className="flex">
        {oneto(9).map(e => <span onClick={() => props.onChange(e)} className={"hover:bg-secondary px-1 rounded cursor-pointer " + (props.selected === e ? "bg-secondary" : "")}>{e}</span>)}
    </div>
}