import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducer';

const useDispatchRedux = (selector: keyof RootState): [any, Dispatch<any>] => {
    const dispatch = useDispatch();
    const select = useSelector((state: RootState) => state[selector]);

    return [select,dispatch]
}

export default useDispatchRedux;