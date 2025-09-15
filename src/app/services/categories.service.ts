export async function getCategories() {
  try {
      const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`,
      { next: { revalidate: 3600 } } 
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


export async function getSubCategories(subCategoryId: string) {
  try {
      const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/${subCategoryId}/subcategories`,
      { next: { revalidate: 3600 } } 
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
