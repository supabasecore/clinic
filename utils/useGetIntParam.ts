import { useParams } from "next/navigation";

export default function useGetIntParam(paramQuery: string) {
    const { [paramQuery]: paramValue } = useParams();

    return typeof paramValue === 'string' ? parseInt(paramValue) : -1;
};

