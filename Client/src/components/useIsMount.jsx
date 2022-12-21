import {useRef, useEffect} from 'react'
// based on https://stackoverflow.com/a/56267719
export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
      isMountRef.current = false;
    }, []);
    return isMountRef.current;
  };