#!/bin/bash
rm -rf /Users/artjack/liora-studio/public/images/products/*
mkdir -p /Users/artjack/liora-studio/public/images/products

echo "Restoring Product Images..."

# 1. Previously Generated High-Quality Rings
cp /Users/artjack/.gemini/antigravity/brain/31191d7d-fe3b-488a-9218-3a9db39f19b7/diamond_solitaire_ring_* /Users/artjack/liora-studio/public/images/products/diamond-solitaire-engagement-ring.jpg
cp /Users/artjack/.gemini/antigravity/brain/31191d7d-fe3b-488a-9218-3a9db39f19b7/rose_gold_signet_* /Users/artjack/liora-studio/public/images/products/rose-gold-signet-ring.jpg

# 2. Fake Store API (Real jewelry placeholders)
curl -s -L -o "/Users/artjack/liora-studio/public/images/products/sapphire-halo-ring.jpg" "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png"
curl -s -L -o "/Users/artjack/liora-studio/public/images/products/gold-hoop-earrings.jpg" "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png"
curl -s -L -o "/Users/artjack/liora-studio/public/images/products/diamond-tennis-bracelet.jpg" "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png"

# 3. DummyJSON (Real earrings placeholders)
curl -s -L -o "/Users/artjack/liora-studio/public/images/products/diamond-stud-earrings.jpg" "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp"
curl -s -L -o "/Users/artjack/liora-studio/public/images/products/pearl-drop-earrings.jpg" "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/1.webp"
curl -s -L -o "/Users/artjack/liora-studio/public/images/products/crystal-flower-brooch.jpg" "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/1.webp"

# 4. LoremFlickr Fallback for the rest
download() {
  local slug=$1
  local lock=$2
  echo "Downloading $slug..."
  curl -s -L -o "/Users/artjack/liora-studio/public/images/products/$slug.jpg" "https://loremflickr.com/800/800/jewelry?lock=$lock"
}

download "vintage-enamel-butterfly-brooch" 50
download "pearl-cluster-brooch" 51
download "gold-chain-necklace" 52
download "diamond-pendant-necklace" 53
download "layered-pearl-choker" 54
download "gold-cuff-bracelet" 55
download "beaded-gemstone-bracelet" 56
download "jewelry-mystery-bag" 57
download "curated-jewelry-gift-box" 58

echo "Done downloading actual images."
