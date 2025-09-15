export async function getProducts(limit = 40, querySrch= '') {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}${querySrch}`,
      { next: { revalidate: 3600 /* 60sec * 60 = 1 hour */ } }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}



export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      { next: { revalidate: 3600 /* 60sec * 60 = 1 hour */ } }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
