"use strict";(()=>{var e={};e.id=146,e.ids=[146],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8893:e=>{e.exports=require("buffer")},4770:e=>{e.exports=require("crypto")},6162:e=>{e.exports=require("stream")},1764:e=>{e.exports=require("util")},8678:e=>{e.exports=import("pg")},6019:(e,r,t)=>{t.a(e,async(e,o)=>{try{t.r(r),t.d(r,{originalPathname:()=>h,patchFetch:()=>u,requestAsyncStorage:()=>c,routeModule:()=>p,serverHooks:()=>_,staticGenerationAsyncStorage:()=>l});var i=t(9303),s=t(8716),n=t(670),a=t(7955),d=e([a]);a=(d.then?(await d)():d)[0];let p=new i.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/orders/route",pathname:"/api/orders",filename:"route",bundlePath:"app/api/orders/route"},resolvedPagePath:"/workspaces/EvansSarmLab/src/app/api/orders/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:l,serverHooks:_}=p,h="/api/orders/route";function u(){return(0,n.patchFetch)({serverHooks:_,staticGenerationAsyncStorage:l})}o()}catch(e){o(e)}})},7955:(e,r,t)=>{t.a(e,async(e,o)=>{try{t.r(r),t.d(r,{GET:()=>d,POST:()=>u,dynamic:()=>p,revalidate:()=>c});var i=t(7070),s=t(5748),n=t(8657),a=e([s]);s=(a.then?(await a)():a)[0];let p="force-dynamic",c=0;async function d(e){try{let r=e.headers.get("authorization"),{userId:t}=(0,n.AY)(r),{searchParams:o}=new URL(e.url),a=o.get("orderId"),d=(0,s.Mj)();if(a){let e=await d.query(`SELECT o.*, json_agg(
          json_build_object(
            'id', oi.id,
            'productId', oi.product_id,
            'productName', oi.product_name,
            'productPrice', oi.product_price,
            'quantity', oi.quantity,
            'subtotal', oi.subtotal
          )
        ) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         WHERE o.id = $1 AND o.user_id = $2
         GROUP BY o.id`,[a,t]);if(0===e.rows.length)return i.NextResponse.json({error:"Order not found"},{status:404});return i.NextResponse.json({order:e.rows[0]})}let u=await d.query(`SELECT o.*, json_agg(
        json_build_object(
          'id', oi.id,
          'productId', oi.product_id,
          'productName', oi.product_name,
          'quantity', oi.quantity
        )
      ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,[t]);return i.NextResponse.json({orders:u.rows})}catch(e){return console.error("Orders GET error:",e),i.NextResponse.json({error:"Failed to fetch orders"},{status:500})}}async function u(e){try{let r=e.headers.get("authorization"),{userId:t}=(0,n.AY)(r),{items:o,shippingAddress:a,paymentMethod:d}=await e.json(),u=(0,s.Mj)(),p=0;for(let e of o)p+=parseFloat(e.price)*e.quantity;let c=p>200?0:10,l=.085*p,_=p+c+l,h=`ORD-${Date.now()}-${t}`,m=await u.query(`INSERT INTO orders (
        user_id, order_number, status, subtotal, shipping_cost, tax_amount, total,
        shipping_first_name, shipping_last_name, shipping_address1, shipping_address2,
        shipping_city, shipping_state, shipping_zip, shipping_country, shipping_phone,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
      RETURNING id, order_number`,[t,h,"pending",p,c,l,_,a.firstName,a.lastName,a.address1,a.address2||null,a.city,a.state,a.zipCode,a.country,a.phone]),y=m.rows[0].id;for(let e of o){let r=parseFloat(e.price)*e.quantity;await u.query(`INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal)
         VALUES ($1, $2, $3, $4, $5, $6)`,[y,e.id,e.name,e.price,e.quantity,r])}return i.NextResponse.json({success:!0,orderNumber:m.rows[0].order_number,orderId:y})}catch(e){return console.error("Orders POST error:",e),i.NextResponse.json({error:"Failed to create order"},{status:500})}}o()}catch(e){o(e)}})},8657:(e,r,t)=>{t.d(r,{Oe:()=>p,RA:()=>d,AY:()=>c,c_:()=>u});var o=t(1482),i=t.n(o);let s=require("bcrypt");var n=t.n(s);let a=process.env.JWT_SECRET||"fallback-secret-key";function d(e){return i().sign(e,a,{expiresIn:"30d"})}async function u(e){return n().hash(e,10)}async function p(e,r){return n().compare(e,r)}function c(e){return function(e){try{return i().verify(e,a)}catch(e){throw Error("Invalid or expired token")}}(function(e){if(!e||!e.startsWith("Bearer "))throw Error("Authorization token required");return e.split(" ")[1]}(e))}},5748:(e,r,t)=>{t.a(e,async(e,o)=>{try{t.d(r,{Mj:()=>n});var i=t(8678),s=e([i]);i=(s.then?(await s)():s)[0];let a=null;function n(){return a||(a=new i.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:!1},max:20,idleTimeoutMillis:3e4,connectionTimeoutMillis:2e3})),a}o()}catch(e){o(e)}})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[276,972,482],()=>t(6019));module.exports=o})();