import React from 'react'

const Skeleton = () => {
  return (

<div class="bg-white rounded mx-auto  shadow-lg" style={{marginTop : '20px'}}>
    <div class="bg-gray-200 w-full h-48 p-3 overflow-hidden animate-pulse">
    </div>
    <div class="h- p-3">
        <div class="grid grid-cols-3 gap-4 mt-2">
            <div class="h-8 bg-gray-200 rounded animate-pulse">
            </div>
            <div class="h-8 bg-gray-200 rounded animate-pulse">
            </div>
            <div class="h-8 bg-gray-200 rounded animate-pulse">
            </div>
            <div class="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
            </div>
            <div class=" h-8 bg-gray-200 rounded animate-pulse">
            </div>
            <div class="...">
            </div>
            <div class="col-span-2 ...">
            </div>
        </div>
    </div>
</div>

  )
}

export default Skeleton