export type ResponseLocal<T> = {
  data: T | null;
  errors: string[] | null;
};

export const useFetch = (url: string) => {
  async function get<T = any>(endpoint = '', options?: RequestInit) {
    const toFetch = fetch(url + endpoint, {
      headers: getHeaders(),
      ...options,
    });

    return await doFetch<T>(toFetch);
  }

  const post = async <T = any>(body: any, endpoint = '', options?: RequestInit) => {
    const toFetch = fetch(`${url}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: getHeaders(),
      ...options,
    });

    return await doFetch<T>(toFetch);
  };

  const put = async <T = any>(body: any, endpoint = '', options?: RequestInit) => {
    const toFetch = fetch(url + endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: getHeaders(),
      ...options,
    });

    return await doFetch<T>(toFetch);
  };

  const del = async <T = any>(endpoint = '', options?: RequestInit) => {
    const toFetch = fetch(url + endpoint, {
      method: 'DELETE',
      headers: getHeaders(),
      ...options,
    });

    return await doFetch<T>(toFetch);
  };

  const patch = async <T = any>(body: any, endpoint = '', options?: RequestInit) => {
    const toFetch = fetch(url + endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: getHeaders(),
      ...options,
    });

    return await doFetch<T>(toFetch);
  };

  const doFetch = async <T>(toFetch: Promise<Response>): Promise<ResponseLocal<T>> => {
    try {
      const res = await toFetch;
      const json = await res.json();

      return res.ok ? { data: json?.data || json, errors: null } : checkError(json);
    } catch (error) {
      return checkError(error);
    }
  };

  const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  };

  const checkError = async (json: any) => {
    let errors: string[] = [];

    if (typeof json === 'string') {
      errors.push(json);
    } else if (json?.message?.length) {
      errors = [json.message];
    } else if (typeof json?.message === 'string') {
      errors.push(json.message);
    } else if (Array.isArray(json)) {
      errors = json;
    } else {
      errors.push('Something went wrong');
    }

    return { errors, data: null };
  };

  return { get, post, put, del, patch };
};

