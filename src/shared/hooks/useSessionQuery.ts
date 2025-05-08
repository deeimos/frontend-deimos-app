import { useQuery } from "@tanstack/react-query";
import UserService from "@/shared/api/services/user.service";
import { UserInfoType } from "@/shared/types/user.type";

const useSessionQuery = (token?: string) =>
  useQuery<UserInfoType>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await UserService.getUser(token);
      return res.data;
    },
    staleTime: 10 * (60 * 1000)
  });

export default useSessionQuery;
