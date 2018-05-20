const swapRealProjection = (projections) => {
    let nextIsActive = false;
    for(let p of projections) {
        let oldState = p.active;
        p.active = nextIsActive;
        nextIsActive = oldState;
    }
    if(nextIsActive) {
        projections[0].active = true;
    }
    return projections;
};

const swapVirtualProjection = (projections) => {
    let newAngle = projections[0].rotation < 270 ? projections[0].rotation + 90 : 0;
    projections[0].rotation = newAngle;
    return projections;
};

const swapProjection = (projections) => {
    if(projections.length === 1) {
        return swapVirtualProjection(projections);
    }
    if(projections.length > 1) {
        return swapRealProjection(projections);
    }
    return [];
    
};

export const rotateItem = (p) => {
    return {
        ...p, 
        projections: swapProjection(p.projections)
    };
};