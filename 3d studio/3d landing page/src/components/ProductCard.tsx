import React from 'react';
import { ModelViewer } from './ModelViewer';

export function ProductCard({ product, ...individualProps }: any) {
    const mergedProps = { ...product, ...individualProps };
    const { id, name, price, modelPath, image, category, description, onClick } = mergedProps;

    return (
        <div className="product-card border p-4 rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col group" onClick={onClick}>
            <div className="flex-grow mb-4">
                {modelPath ? (
                    <ModelViewer modelPath={modelPath} />
                ) : (
                    <div className="aspect-square bg-gray-100 mb-4 rounded-md flex items-center justify-center overflow-hidden">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">No Image</span>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h3 className="font-bold text-lg">{name || "Product"}</h3>
                <p className="text-gray-600">{typeof price === 'number' ? `Rs ${price.toLocaleString()}` : (price || "Rs 0")}</p>
                {description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>}
            </div>
        </div>
    );
}
