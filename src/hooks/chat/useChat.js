import { useMutation, useQueryClient } from "react-query";
import {
  getChatAIGenerate,
  getChatAIGenerateItem,
} from "../../api/controller/chat-api";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const useChatGenerateAI = ({ onSuccess }) => {
  return useMutation(
    ["getChatAIGenerate"],
    (formData) => getChatAIGenerate(formData),
    {
      onSuccess: (data, variables, context) => {
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

export const useChatGenerateAItem = ({ onSuccess }) => {
  return useMutation(
    ["getChatAIGenerateItem"],
    (formData) => getChatAIGenerateItem(formData),
    {
      onSuccess: (data, variables, context) => {
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
