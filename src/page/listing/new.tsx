import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validation/listing.schema";
import FileInput from "../../component/form/FileInput";
import TextInput from "../../component/form/TextInput";
import TextareaInput from "../../component/form/TextArea";

const AddProduct = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const watchedFiles = watch("image");

  useEffect(() => {
    if (watchedFiles && watchedFiles.length > 0) {
      const fileArray = Array.from(watchedFiles);
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);

      return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [watchedFiles]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("deliveryDateTime", data.deliveryDateTime);
    formData.append("hasWarranty", data.hasWarranty);
    formData.append("specialFeatures", data.specialFeatures);

    Array.from(data.image).forEach((file) =>
      formData.append("images", file as Blob)
    );

    console.log("Form submitted!", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-neutral-700 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">Create New Product</h1>
        <p className="mt-2 opacity-90">
          Add your product details to get started
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white shadow-lg p-8 rounded-xl border"
      >
        {/* Image Upload Section */}
        <div className="border-b pb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Product Images
          </h2>
          <FileInput
            name="image"
            label="Upload Product Images (minimum 4 required)"
            register={register}
            multiple
            errors={errors}
          />
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {previewImages.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                      Image {idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Basic Information Section */}
        <div className="border-b pb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <TextInput
                name="title"
                label="Product Title"
                register={register}
                errors={errors}
              />
            </div>

            <div className="md:col-span-2">
              <TextareaInput
                name="description"
                label="Product Description"
                register={register}
                errors={errors}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Price ($USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  step="0.001"
                  {...register("price")}
                  className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.03"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.price?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery & Features Section */}
        <div className="border-b pb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Delivery & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Date/Time */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Delivery Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                {...register("deliveryDateTime")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.deliveryDateTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.deliveryDateTime?.message}
                </p>
              )}
            </div>

            {/* Warranty */}
            <div>
              <label className="block mb-3 font-medium text-gray-700">
                Warranty Coverage
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="true"
                    {...register("hasWarranty")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    Yes, product has warranty
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="false"
                    {...register("hasWarranty")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No warranty provided</span>
                </label>
              </div>
              {errors.hasWarranty && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.hasWarranty?.message}
                </p>
              )}
            </div>

            {/* Special Features */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">
                Special Features
              </label>
              <textarea
                {...register("specialFeatures")}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Highlight any unique features, specifications, or special qualities of your product..."
              />
              {errors.specialFeatures && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.specialFeatures?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-neutral-800 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Create Product Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
