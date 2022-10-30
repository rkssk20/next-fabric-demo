const Explanation = () => {
  return (
    <div className="py-6 px-4 overflow-y-scroll">
      <p className="text-2xl">テキストのヒント</p>

      <p className="mt-8 text-xl">新規テキストの追加</p>

      <div className="mt-4 flex items-center">
        <div
          className='
            w-20
            h-[68px]
            p-2
            flex
            flex-col
            items-center
            border
            border-ogp-border
            border-solid
          '
        >
          <span className="material-symbols-rounded">&#xe145;</span>
          <p className="mt-2 text-xs">追加</p>
        </div>

        <p className="ml-4">をクリック</p>
      </div>

      <p className="mt-8 text-xl">テキストの入力</p>

      <p className="mt-4">タッチ(クリック)で選択したテキストを、もう一度タッチ(クリック)する。</p>

    </div>
  )
}

export default Explanation