// export default App;
import React from 'react';
import { useState } from 'react';

interface product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}
const PRODUCTS:product[] = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];



function ProductCategoryRow({ category }: {category:string}) {
  const colSpanValue = "4";
  return (
    <tr>
      <th colSpan = {parseInt(colSpanValue)}>
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }: {product:product}) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products,filterText,inStockOnly }:{ products:product[],filterText:string,inStockOnly:boolean }) {

  const rows:any[] = [];
  let lastCategory:string|null = null;

  products.forEach((product:product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLocaleLowerCase()) === -1) return;
    if (inStockOnly && !product.stocked) return;
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({filterText, inStockOnly,onFilterTextChange,onInStockChange}: {filterText:string, inStockOnly:boolean,onFilterTextChange:(value:string)=>void,onInStockChange:(checked:boolean)=>void}) {
  return (
    <form>
      <input
        data-tetid="searchbar"
        type="text" 
        value={filterText}
        placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value) }
        />
      <label>
        <input 
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockChange(e.target.checked) }
        />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: {products:product[]} ) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockChange={setInStockOnly}
      />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly}  
      />
    </div>
  );
}

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
