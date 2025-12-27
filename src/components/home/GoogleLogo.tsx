export function GoogleLogo() {
  return (
    <div className="flex justify-center select-none">
      {/* 不用圖檔，先用彩色字拼出來；你要換成 img 也行 */}
      <div className="text-[92px] leading-none font-semibold tracking-tight">
        <span className="text-blue-500">G</span>
        <span className="text-red-500">o</span>
        <span className="text-yellow-500">o</span>
        <span className="text-blue-500">g</span>
        <span className="text-green-500">l</span>
        <span className="text-red-500">e</span>
      </div>
    </div>
  )
}
