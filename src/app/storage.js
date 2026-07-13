export const loadState = () =>{

    const savedState = localStorage.getItem("reduxState");

    if(!savedState){
        return undefined;
    }

    return JSON.parse(savedState);
}

export const saveState = (state) => {

   const persistedData = JSON.stringify(state);
   
   localStorage.setItem("reduxState" , persistedData);

}