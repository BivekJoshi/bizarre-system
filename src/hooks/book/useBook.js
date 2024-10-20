import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addBook,
  deleteBook,
  editBook,
  filterBook,
  getBook,
  getBookById,
} from "../../api/controller/book-api";
import { getErrorMessage } from "../../utils/getErrorMessage";

/*________________________GET_____________________________________*/
export const useGetBook = (pageNumber, pageSize) => {
  return useQuery(
    ["getBook", pageNumber, pageSize],
    () => getBook(pageNumber, pageSize),
    {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________GET_BY_ID_____________________________________*/
export const useGetBookById = (id) => {
  return useQuery(["getBookById"], () => getBookById(id), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddBook = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addBook"], (formData) => addBook(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Book added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBook");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________PATCH_____________________________________*/
export const useEditBook = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editBook"], (formData) => editBook(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Book edited successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBook");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

/*________________________DELETE_____________________________________*/
export const useDeleteBook = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["deleteBook"], (id) => deleteBook(id), {
    onSuccess: (data, variables, context) => {
      toast.success("Book deleted successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getBook");
    },
  });
};

/*________________________FILTER_CUSTOMER_TABLE_____________________________________*/
export const useFilterBook = ({ onSuccess }) => {
  return useMutation(["filterBook"], (formData) => filterBook(formData), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};
