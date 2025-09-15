export async function getBrands() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/brands`,
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