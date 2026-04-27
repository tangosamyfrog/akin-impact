/* ============================================================
   AKIN.IMPACT — App
   ============================================================ */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "paper": "default",
  "showLearnings": true,
  "showQuote": true,
  "dashboardDensity": "rich"
}/*EDITMODE-END*/;

const App = () => {
  const [active, setActive] = useState('Dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.dataset.paper = tweaks.paper === 'default' ? '' : tweaks.paper;
  }, [tweaks.paper]);

  const openApply = () => setModalOpen(true);
  const onEngage = () => setModalOpen(true);

  return (
    <>
      <div className="page">
        <Nav active={active} setActive={setActive} onApply={openApply}/>
        <Hero onApply={openApply}/>
        <Dashboard density={tweaks.dashboardDensity}/>
        <Initiatives onEngage={onEngage}/>
        <Engage onApply={openApply}/>
        <Projects/>
        <Causes/>
        <Partners/>
        {tweaks.showLearnings && <Learnings/>}
        {tweaks.showQuote && <Quote/>}
        <CTABand onApply={openApply}/>
        <Footer/>
      </div>

      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)}/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Paper">
          <TweakRadio value={tweaks.paper}
            onChange={v => setTweak('paper', v)}
            options={[
              { value: 'default', label: 'Light' },
              { value: 'warmer',  label: 'Warm' },
              { value: 'darker',  label: 'Deeper' },
            ]}/>
        </TweakSection>
        <TweakSection title="Sections">
          <TweakToggle label="'What didn't work'" value={tweaks.showLearnings} onChange={v => setTweak('showLearnings', v)}/>
          <TweakToggle label="Pull quote"          value={tweaks.showQuote}    onChange={v => setTweak('showQuote', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
