import axios, { AxiosResponse, AxiosError } from "axios";
import { APIPromise } from "../interfaces/API";

export const ActionHandler = async (
  action: string,
  url: string,
  data: any,
  headers = {}
): Promise<AxiosResponse> => {
  switch (action) {
    case "GET":
      return await axios.get(url, {
        headers,
      });

    case "POST":
      return await axios.post(url, data, {
        headers,
      });

    case "PUT":
      return await axios.put(url, data, {
        headers,
      });
    
      // added data filed to delete course by id data : {id : _id}
    case "DELETE":
      return await axios.delete(url, { data , headers});
  }
};

export const APIHandler = async (
  action: string,
  url: string,
  data = {},
  headers = {}
): Promise<APIPromise> => {
  try {
    const response = await ActionHandler(action, url, data, headers);

    if (response.status >= 200 && response.status <= 299) {
      return {
        status: true,
        data: response.data,
        message: response.data.message,
      };
    }

    return {
      status: false,
      error: response.data.error,
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        status: false,
        message: "Server API is failed",
        error: e.response?.data.error,
      };
    }
    return {
      status: false,
      error: "API Failed",
    };
  }
};
