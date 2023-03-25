import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const useAuth = () => {
  const router = useRouter();
  const store = useStore();

  const createUser = async (user) => {
    const resp = await store.dispatch("auth/createUser", user);

    return resp;
  };

  const loginUser = async (user) => {
    const resp = await store.dispatch("auth/signInUser", user);

    return resp;
  };

  const checkAuthStatus = async () => {
    const resp = await store.dispatch("auth/checkAuthentication");

    return resp;
  };

  const logout = () => {
    store.commit("auth/logout");
    router.push({ name: "login" });
  };

  return {
    checkAuthStatus,
    createUser,
    loginUser,
    logout,

    authStatus: computed(() => store.getters["auth/currentState"]),
    username: computed(() => store.getters["auth/username"]),
    userRoles: computed(() => store.getters["auth/getUserRole"]),
  };
};

export default useAuth;
