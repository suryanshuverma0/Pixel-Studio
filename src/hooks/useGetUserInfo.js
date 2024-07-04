export const useGetUserInfo = () => {
         const userInfoString = localStorage.getItem("auth");
         if (userInfoString) {
           const {  email, userId, isAuth } = JSON.parse(userInfoString);
           console.log(email , userId , isAuth)
           return {  email, userId, isAuth };
         } else {
           return { email: null, userId: null, isAuth: false };
         }
       };
       