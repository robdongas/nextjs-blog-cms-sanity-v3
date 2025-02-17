// Renders the Open Graph image used on the home page

export const width = 1200
export const height = 630

export function OpenGraphImage(props: { title: string }) {
  const { title } = props
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        backgroundColor: 'white',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
        backgroundSize: '100px 100px',
        backgroundPosition: '0 -8px, 0 -8px',
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="400px" height="400px" viewBox="0 -1 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
            <g transform="translate(-377.000000, -601.000000)" id="Group" stroke="#000000" stroke-width="2">
              <g transform="translate(375.000000, 598.000000)" id="Shape">
                <path d="M3,13.5793719 C9.98914658,5.83454059 14.2442185,2.78592627 15.7652158,4.43352892 C18.0467117,6.90493289 7.55581053,16.1455344 9.47834357,17.954063 C11.4008766,19.7625917 16.9959382,11.5719148 19.0578414,12.4109285 C21.1197445,13.2499421 16.1152903,18.1722847 17.4055985,18.9997829 C18.2658039,19.5514483 19.3191667,19.0606734 20.5656867,17.527458">

                </path>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          fontStyle: 'normal',
          color: 'black',
          marginTop: 0,
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
        }}
      >
        <b style={{ background: '#fff' }}>{title}</b>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      />
    </div>
  )
}
