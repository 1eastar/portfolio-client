import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

const useInput = (init: any) => {
    const [input, setInput] = useState(init);

    const typeInput = useCallback((e: any) => {
        setInput(e.target.value);
    },[])

    const reset = useCallback(() => setInput(init), [init]);

    return [input, typeInput, reset];
}

export default useInput;