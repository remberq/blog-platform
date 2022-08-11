class ApiResponses {
  BASE_URL = 'https://blog.kata.academy/api/';

  async articleLike(slug: string, token: string, method: string) {
    try {
      const response = await fetch(`${this.BASE_URL}articles/${slug}/favorite`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async submitNewProfileData(token, newData) {
    try {
      const response = await fetch(`${this.BASE_URL}user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: newData }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw responseData;
      }
      return responseData;
    } catch (errorData) {
      return errorData;
    }
  }

  async deleteCurrentArticle(slug, token: string) {
    try {
      const response = await fetch(`${this.BASE_URL}articles/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error with get article data');
      }
    } catch (e) {
      return e;
    }
  }

  async getCurrentArticle(slug) {
    try {
      const response = await fetch(`${this.BASE_URL}articles/${slug}`);
      const articleData = await response.json();
      if (!response.ok) throw new Error('Error with getting article', articleData);
      return articleData;
    } catch (e) {
      console.log(e);
    }
  }

  async loginUser(formData) {
    try {
      const response = await fetch(`${this.BASE_URL}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: formData,
        }),
      });
      if (!response.ok) {
        throw new Error('Email or password is invalid');
      }
      return await response.json();
    } catch (e) {
      return false;
    }
  }

  async addNewArticle(slug, token, data, method) {
    await fetch(`${this.BASE_URL}${slug}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
}

export default ApiResponses;
