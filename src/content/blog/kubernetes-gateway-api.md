---
title: "Kubernetes Gateway API: The Future of Ingress"
description: "An introduction to the Kubernetes Gateway API, how it improves on Ingress, and how to get started with it in your cluster."
pubDate: 2026-03-19
draft: true
tags: ["kubernetes", "networking", "gateway-api", "cloud-native"]
---

## What Is the Kubernetes Gateway API?

The Kubernetes Gateway API is a collection of resources that model service networking in Kubernetes. It is the official successor to the `Ingress` API, designed to be more expressive, extensible, and role-oriented. Whereas Ingress has been the de-facto standard for exposing HTTP workloads since early versions of Kubernetes, it has long suffered from limitations: annotations-based customisation that varies across implementations, no native support for traffic splitting, and a single resource type that conflates infrastructure concerns with application concerns.

Gateway API addresses all of these shortcomings by splitting responsibility across three distinct resource types — `GatewayClass`, `Gateway`, and `HTTPRoute` — each owned by a different persona in a typical organisation.

## Core Concepts

### GatewayClass

A `GatewayClass` is a cluster-scoped resource that defines the type of load-balancer infrastructure to provision. It is typically managed by infrastructure operators or cloud providers and maps to a specific controller implementation (for example, Envoy Gateway, Cilium, or a managed cloud load balancer). Think of it as the equivalent of a `StorageClass` for networking.

### Gateway

A `Gateway` is created by a platform operator and instantiates the infrastructure described by a `GatewayClass`. It specifies which protocols and ports to listen on, and which namespaces are allowed to attach routes. This separation lets platform teams control networking capacity while still granting application teams autonomy over their own routing rules.

### HTTPRoute (and friends)

`HTTPRoute` is the resource that application developers interact with day-to-day. It attaches to a `Gateway` and describes how HTTP traffic should be routed to backend `Services`. The API natively supports path and header matching, traffic splitting for canary deployments, request redirects, and header manipulation — all without a single annotation.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: my-app
  namespace: production
spec:
  parentRefs:
    - name: prod-gateway
      namespace: infra
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api
      backendRefs:
        - name: my-api-service
          port: 8080
```

Beyond HTTP, the API also includes `GRPCRoute`, `TCPRoute`, `TLSRoute`, and `UDPRoute` resources, making it a unified model for virtually all layer-4 and layer-7 traffic.

## Why Switch from Ingress?

| Feature | Ingress | Gateway API |
|---|---|---|
| Traffic splitting | Annotation-only | Native |
| Multi-team support | Limited | Role-oriented by design |
| Protocol support | HTTP/S only | HTTP, gRPC, TCP, TLS, UDP |
| Portability | Low (annotations differ) | High (standardised spec) |
| Status & observability | Basic | Rich condition reporting |

The role-oriented model is perhaps the biggest operational improvement. In a large organisation, the team that manages load balancers is rarely the same team deploying application code. Gateway API encodes this separation directly into the API surface, making it straightforward to apply RBAC and enforce policies at each layer independently.

## Getting Started

The Gateway API CRDs are not bundled with Kubernetes itself — they must be installed separately:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/latest/download/standard-install.yaml
```

After installing the CRDs, choose a controller implementation that suits your environment. [Envoy Gateway](https://gateway.envoyproxy.io/) and [Cilium](https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/) are popular open-source options; most managed Kubernetes offerings (GKE, EKS, AKS) also provide first-party Gateway API implementations.

Once a `GatewayClass` and `Gateway` are in place, application teams can begin writing `HTTPRoute` resources immediately — no cluster-admin privileges required.

## Conclusion

The Kubernetes Gateway API represents a significant step forward in how cloud-native applications handle ingress and service routing. Its expressive API, clear separation of concerns, and broad protocol support make it well-suited for teams operating Kubernetes at scale. If you are still relying on `Ingress` today, the Gateway API is worth evaluating as your next networking layer.
