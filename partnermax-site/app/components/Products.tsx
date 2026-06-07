import type { ReactNode } from "react";
import {
  WirelessIcon,
  FibreIcon,
  VoiceIcon,
  BundleIcon,
} from "./icons";

type Product = {
  num: string;
  title: string;
  desc: ReactNode;
  icon: ReactNode;
  featured?: boolean;
};

const PRODUCTS: Product[] = [
  {
    num: "Wireless",
    title: "Rogers Business Wireless",
    desc: "Pooled data, voice, SMS and signal-priority plans across your fleet — activated under one account and billed on one invoice.",
    icon: <WirelessIcon />,
  },
  {
    num: "Internet",
    title: "Dedicated Business Fibre",
    desc: (
      <>
        Symmetric, SLA-backed circuits from 250&nbsp;Mbps to 10&nbsp;Gbps.
        Typical provisioning in 14 days, with 24×7 NOC support.
      </>
    ),
    icon: <FibreIcon />,
  },
  {
    num: "Plans",
    title: "Business Plans & Voice",
    desc: "Hosted PBX, conferencing, toll-free and business landlines. Plan changes processed within one business day.",
    icon: <VoiceIcon />,
  },
  {
    num: "Bundle",
    title: "Enterprise Connect",
    desc: "Wireless, fibre, voice and managed security — priced, provisioned and billed as one.",
    icon: <BundleIcon />,
    featured: true,
  },
];

export default function Products() {
  return (
    <div className="site-products">
      {PRODUCTS.map((p, i) => (
        <div
          key={p.num}
          className={
            "site-product fade-up" +
            (p.featured ? " site-product--featured" : "")
          }
          {...(i > 0 ? { "data-delay": String(i) } : {})}
        >
          <span className="site-product__num">{p.num}</span>
          <h3 className="site-product__title">{p.title}</h3>
          <p className="site-product__desc">{p.desc}</p>
          <div className="site-product__icon">{p.icon}</div>
        </div>
      ))}
    </div>
  );
}
