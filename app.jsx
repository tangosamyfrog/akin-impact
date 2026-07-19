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
  const [view, setView] = useState('report'); // 'report' | 'masterclass'
  const [modalOpen, setModalOpen] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.dataset.paper = tweaks.paper === 'default' ? '' : tweaks.paper;
  }, [tweaks.paper]);

  const openApply = () => setModalOpen(true);
  const onEngage = () => setModalOpen(true);

  const openMasterclass = () => {
    setView('masterclass');
    window.scrollTo({ top: 0 });
  };

  // From the Masterclass view, a report nav link returns to the report and scrolls.
  const onNavigate = (label) => {
    setActive(label);
    if (view !== 'report') {
      setView('report');
      const id = (NAV_LINKS.find(l => l.label === label) || {}).id;
      if (id) setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0 });
      }, 30);
    }
  };

  const nav = (
    <Nav active={active} setActive={setActive} view={view}
      onNavigate={onNavigate} onMasterclass={openMasterclass} onApply={openApply}/>
  );

  return (
    <>
      <div className="page">
        {nav}
        {view === 'masterclass' ? (
          <Masterclass/>
        ) : (
          <>
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
          </>
        )}
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
