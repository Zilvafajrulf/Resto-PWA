import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDbSource {
  static async restaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.LISTRESTO);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson.restaurants;
    } catch (error) {
      console.error('Error fetching restaurant list:', error);
      throw error;
    }
  }

  static async restaurantDetail(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson.restaurant;
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
      throw error;
    }
  }

  static async addReview({ id, name, review }) {
    const response = await fetch(`${API_ENDPOINT.REVIEW}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, review }),
    });
    return response.json();
  }
}

export default RestaurantDbSource;
