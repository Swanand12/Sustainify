import toast from "react-hot-toast";

export const getTime = (bidClosingTime) => {
   return (
      new Date(bidClosingTime).toLocaleTimeString().slice(0, 4) +
      new Date(bidClosingTime).toLocaleTimeString().slice(7)
   );
};

export const getDateTime = (bidClosedTime) => {
   return (
      new Date(bidClosedTime).toLocaleDateString() + " " +
      new Date(bidClosedTime).toLocaleTimeString().slice(0,-6) + " " +
      new Date(bidClosedTime).toLocaleTimeString().slice(-2) 
   );
};

export const setClosingTime = (e, setBidClosingTime) => {
   const dateObject = new Date(e.target.value);
   const timeInMilliseconds = dateObject.getTime();
   const currTimeInMilliseconds = new Date().getTime();

   if (timeInMilliseconds < currTimeInMilliseconds) {
      toast.error("Please Select future time");
   } else {
      setBidClosingTime(e.target.value);
   }
};
