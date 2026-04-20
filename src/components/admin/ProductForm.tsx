"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  initialData?: {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    categoryId: string;
    image: string;
    showInGallery: boolean;
  };
}

export const ProductForm = ({ categories, initialData }: ProductFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    image: initialData?.image || "/product/placeholder.png",
    showInGallery: initialData?.showInGallery ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === "number") {
      processedValue = value === "" ? "" : parseFloat(value);
    }

    if (name === "image" && typeof processedValue === "string") {
      if (processedValue.startsWith("public/")) {
        processedValue = processedValue.replace("public/", "/");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(initialData ? "Producto actualizado" : "Producto creado con éxito");
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error("Error al guardar el producto");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Imagen y Estado */}
        <div className="space-y-6">
          <Card className="border-neutral-200 overflow-hidden shadow-sm">
            <div className="aspect-square relative bg-neutral-100 flex items-center justify-center border-b border-neutral-200">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="h-12 w-12 text-neutral-300" />
              )}
            </div>
            <CardContent className="p-4">
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">URL de la Imagen</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:ring-1 focus:ring-sage outline-none"
                placeholder="/product/nombre.png"
              />
              <p className="text-[10px] text-muted-foreground mt-2 italic">Próximamente: subida de archivos directa.</p>
            </CardContent>
          </Card>

          <Card className="border-neutral-200 shadow-sm">
            <CardContent className="p-4 space-y-4">
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-primary">Mostrar en tienda</label>
                 <input
                   type="checkbox"
                   name="showInGallery"
                   checked={formData.showInGallery}
                   onChange={handleCheckboxChange}
                   className="h-4 w-4 accent-sage"
                 />
               </div>
               <p className="text-[10px] text-muted-foreground leading-relaxed">
                 Si desactivas esta opción, el producto no aparecerá en el listado público pero seguirá existiendo en el admin.
               </p>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha: Detalles */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-neutral-200 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Nombre del Producto *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all"
                  placeholder="Ej. Cojín bordado a mano"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all resize-none"
                  placeholder="Describe los materiales, dimensiones y el cariño puesto en esta pieza..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Precio (€) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Stock Inicial *</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Categoría *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 h-12 rounded-xl shadow-lg shadow-primary/10 transition-all"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {initialData ? "Actualizar Producto" : "Crear Producto"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              className="px-6 border-neutral-200 rounded-xl hover:bg-neutral-50"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
