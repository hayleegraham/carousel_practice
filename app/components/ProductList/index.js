"use client";
import "./ProductList.scss";
import Card from "@/app/components/Card";

export default function ProductList({ data }) {
  return (
    <div className="product-list xl:w-[1035px]">
    
      <h2 className="font-bold text-2xl">{data.title}</h2>
           
      <div className="relative h-[440px] flex justify-center xl:block">
        <div className="mask xl:w-[1035px] w-[310px]">
          <div className="track">
            {data?.items?.map((seed) => (
              <Card
                key={seed.name}
                data={seed}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}